import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { UpdatePasswordAdminDto } from "./dto/update-password.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService
  ) {}
  async registratsiya(createAdminDto: CreateAdminDto) {
    const admin = await this.findByEmail(createAdminDto.email);
    if (admin) {
      throw new ConflictException("Bunday emailli admin mavjud");
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);

    const newAdmin = await this.adminRepo.save({
      ...createAdminDto,
      passwordHash: hashedPassword,
    });

    const { id, email, fullName, username, phoneNumber, isActive } = newAdmin;

    return { id, email, fullName, username, phoneNumber, isActive };
  }

  async loginAdmin(loginAdminDto: LoginAdminDto, res: Response) {
    const admin = await this.findByEmail(loginAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException("Email yoki Password noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      loginAdminDto.password,
      admin.passwordHash
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki Password noto'g'ri");
    }

    const tokens = await this.generateToken(admin);

    res.cookie("refresh-token-admin", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    admin.refreshTokenHash = hashedRefreshToken;
    await this.adminRepo.save(admin);

    return {
      message: "admin logged successfully",
      token: tokens.accessToken,
    };
  }

  async logoutAdmin(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token-admin"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const admin = await this.findByEmail(payload.email);

    if (!admin) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    res.clearCookie("refresh-token-admin", {
      httpOnly: true,
    });

    admin.refreshTokenHash = "";
    await this.adminRepo.save(admin);

    return {
      message: "admin logged out",
    };
  }

  async refreshToken(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token-admin"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const admin = await this.findByEmail(payload.email);

    if (!admin) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    const tokens = await this.generateToken(admin);

    res.cookie("refresh-token-admin", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    admin.refreshTokenHash = hashed_refresh_token;
    await this.adminRepo.save(admin);

    return {
      message: "Refresh token yangilandi",
      token: tokens.accessToken,
    };
  }

  findAll() {
    return this.adminRepo.find({
      select: [
        "id",
        "username",
        "email",
        "fullName",
        "phoneNumber",
        "isActive",
        "isCreator",
      ],
    });
  }

  findOne(id: number) {
    return this.adminRepo.findOne({
      select: [
        "id",
        "username",
        "email",
        "fullName",
        "phoneNumber",
        "isActive",
        "isCreator",
      ],
      where: { id },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.preload({ id, ...updateAdminDto });
    if (!admin) {
      throw new NotFoundException("Bunday id admin mavjud emas");
    }
    return this.adminRepo.save(admin);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new BadRequestException("Bunday emailli admin mavjud emas");
    }
    this.adminRepo.delete(id);
    return id;
  }

  async updatePassword(
    id: number,
    updatePasswordAdminDto: UpdatePasswordAdminDto
  ) {
    const admin = await this.findOne(id);

    if (!admin) {
      throw new NotFoundException("Bunday admin mavjud emas");
    }

    const { password, confirmPassword } = updatePasswordAdminDto;

    if (password !== confirmPassword) {
      throw new BadRequestException("Parollar bir-birga mos emas");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    admin.passwordHash = hashedPassword;
    this.adminRepo.save(admin);
    return {
      message: "Parol o'zgartirildi",
    };
  }

  findByEmail(email: string) {
    return this.adminRepo.findOneBy({ email });
  }

  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      name: admin.username,
      email: admin.email,
      is_active: admin.isActive,
      is_creator: admin.isCreator,
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
}
