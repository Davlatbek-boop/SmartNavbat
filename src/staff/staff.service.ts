import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Staff } from "./entities/staff.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginStaffDto } from "./dto/login-staff.dto";
import { Request, Response } from "express";
import { UpdatePasswordStaffDto } from "./dto/update-password-staff.dto";
import { RolesService } from "../roles/roles.service";
import { BranchesService } from "../branches/branches.service";
import { StaffSessionsService } from "../staff-sessions/staff-sessions.service";

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private readonly staffRepo: Repository<Staff>,
    private readonly jwtService: JwtService,
    private readonly roleService: RolesService,
    private readonly branchService: BranchesService,
    @Inject(forwardRef(() => StaffSessionsService))
    private readonly staffSessionsService: StaffSessionsService
  ) {}
  async registratsiya(createStaffDto: CreateStaffDto) {
    const { roleId, branchId } = createStaffDto;

    const staff = await this.findByEmail(createStaffDto.email);
    if (staff) {
      throw new ConflictException("Bunday emailli staff mavjud");
    }

    const role = await this.roleService.findOne(roleId);

    if (!role) {
      throw new BadRequestException("Bunday ID li role mavjud emas");
    }

    const branch = await this.branchService.findOne(branchId);

    if (!branch) {
      throw new BadRequestException("Bunday ID li Branch mavjud emas");
    }

    const hashedPassword = await bcrypt.hash(createStaffDto.password, 7);

    const newStaff = await this.staffRepo.save({
      ...createStaffDto,
      passwordHash: hashedPassword,
      role,
      branch,
    });

    return newStaff;
  }

  async loginStaff(loginStaffDto: LoginStaffDto, res: Response, req: Request) {
    const staff = await this.findByEmail(loginStaffDto.email);

    if (!staff) {
      throw new UnauthorizedException("Email yoki Password noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      loginStaffDto.password,
      staff.passwordHash
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki Password noto'g'ri");
    }

    const tokens = await this.generateToken(staff);

    res.cookie("refresh-token-staff", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    staff.lastLogin = new Date();
    staff.refreshTokenHash = hashedRefreshToken;
    await this.staffRepo.save(staff);

    //Staff Sessionni yozish funksiyasi  pastda yozilgan
    await this.createStaffSession(staff.id, req, "login");

    return {
      message: "staff logged successfully",
      token: tokens.accessToken,
    };
  }

  async logoutStaff(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token-staff"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const staff = await this.findByEmail(payload.email);

    if (!staff) {
      throw new BadRequestException("Bunday refresh tokenli staff topilmadi");
    }

    res.clearCookie("refresh-token-staff", {
      httpOnly: true,
    });

    staff.refreshTokenHash = "";
    await this.staffRepo.save(staff);

    await this.createStaffSession(staff.id, req, "logout");

    return {
      message: "staff logged out",
    };
  }

  async refreshTokenStaff(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token-staff"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const staff = await this.findByEmail(payload.email);

    if (!staff) {
      throw new BadRequestException("Bunday refresh tokenli staff topilmadi");
    }

    const tokens = await this.generateToken(staff);

    res.cookie("refresh-token-staff", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    staff.refreshTokenHash = hashedRefreshToken;
    await this.staffRepo.save(staff);

    return {
      message: "refresh token yangilandi",
      token: tokens.accessToken,
    };
  }

  findAll() {
    return this.staffRepo.find({
      // relations: ["role", "branch", "staffSession"],
    });
  }

  findOne(id: number) {
    return this.staffRepo.findOneBy({ id });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.staffRepo.preload({ id, ...updateStaffDto });
    if (!staff) {
      throw new BadRequestException("Bunday Staff mavjud emas");
    }
    return this.staffRepo.save(staff);
  }

  async remove(id: number) {
    const staff = await this.findOne(id);

    if (!staff) {
      throw new BadRequestException("Bunday staff mavjud emas");
    }
    this.staffRepo.delete(id);
    return {
      message: `${id} ID li staff o'chirildi`,
    };
  }

  async updatePassword(
    id: number,
    updatePasswordStaffDto: UpdatePasswordStaffDto
  ) {
    const { oldPassword, confirmPassword, newPassword } =
      updatePasswordStaffDto;

    const staff = await this.findOne(id);

    if (!staff) {
      throw new NotFoundException("Bunday staff mavjud emas");
    }

    const validPassword = await bcrypt.compare(oldPassword, staff.passwordHash);

    if (!validPassword) {
      throw new BadRequestException("Parolni xato kiritdingiz");
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException("Parollar bir-birga mos emas");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 7);

    staff.passwordHash = hashedPassword;
    this.staffRepo.save(staff);
    return {
      message: "Client Paroli o'zgartirildi",
    };
  }

  findByEmail(email: string) {
    return this.staffRepo.findOne({ where: { email }, relations: ["role"] });
  }

  async generateToken(staff: Staff) {
    const payload = {
      id: staff.id,
      name: staff.fullName,
      email: staff.email,
      is_active: staff.isActive,
      role: staff.role.name,
    };


    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return { accessToken, refreshToken };
  }

  async createStaffSession(staffId: number, req: Request, motion: string) {
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
      req.socket.remoteAddress ||
      "";

    const userAgent = req.headers["user-agent"] || ""; // foydalanuvchi qurilmasi haqida info

    const staffSession = {
      staffId: staffId,
      motion,
      date: new Date(),
      ipAddress: ip,
      deviceInfo: userAgent,
    };

    await this.staffSessionsService.create(staffSession);
  }
}
