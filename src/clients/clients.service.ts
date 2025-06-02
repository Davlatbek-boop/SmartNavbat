import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { LoginClientDto } from "./dto/login-client.dto";
import { Request, Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./entities/client.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import { v4 as uuidv4 } from "uuid";
import { UpdatePasswordClientDto } from "./dto/update-password-client.dto";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private readonly clientRepo: Repository<Client>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async registratsiya(createClientDto: CreateClientDto) {
    const client = await this.findByEmail(createClientDto.email);
    if (client) {
      throw new ConflictException("Bunday emailli client mavjud");
    }

    const hashedPassword = await bcrypt.hash(createClientDto.password, 7);
    const activationLink = uuidv4();

    const newClient = await this.clientRepo.save({
      ...createClientDto,
      activationLink,
      passwordHash: hashedPassword,
    });

    try {
      await this.mailService.sendMail(newClient);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return newClient;
  }

  async loginClient(loginClientDto: LoginClientDto, res: Response) {
    const client = await this.findByEmail(loginClientDto.email);

    if (!client) {
      throw new UnauthorizedException("Email yoki Password noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      loginClientDto.password,
      client.passwordHash
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki Password noto'g'ri");
    }

    const tokens = await this.generateToken(client);

    res.cookie("refresh-token-client", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);

    client.refreshTokenHash = hashedRefreshToken;
    await this.clientRepo.save(client);

    return {
      message: "client logged successfully",
      token: tokens.accessToken,
    };
  }

  async logoutClient(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token-client"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const client = await this.findByEmail(payload.email);

    if (!client) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    res.clearCookie("refresh-token-client", {
      httpOnly: true,
    });

    client.refreshTokenHash = "";
    await this.clientRepo.save(client);

    return {
      message: "client logged out",
    };
  }

  async refreshTokenClient(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies["refresh-token-client"];

    if (!cookieRefreshToken) {
      throw new UnauthorizedException("Cookie da refresh token topilmadi");
    }

    const payload = await this.jwtService.decode(cookieRefreshToken);

    if (!payload) {
      throw new UnauthorizedException("Refresh token xato");
    }

    const client = await this.findByEmail(payload.email);

    if (!client) {
      throw new BadRequestException(
        "Bunday refresh tokenli foydalanuvchi topilmadi"
      );
    }

    const tokens = await this.generateToken(client);

    res.cookie("refresh-token-client", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    client.refreshTokenHash = hashed_refresh_token;
    await this.clientRepo.save(client);

    return {
      message: "Refresh token yangilandi",
      token: tokens.accessToken,
    };
  }

  async activateClient(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link topilmadi");
    }

    const client = await this.clientRepo.update(
      { activationLink: link, isActive: false },
      { isActive: true }
    );

    if (!client) {
      throw new BadRequestException("Client avval activatsiya qilgan");
    }

    return {
      message: "Client faol bo'ldi",
    };
  }

  findAll() {
    return this.clientRepo.find();
  }

  findOne(id: number) {
    return this.clientRepo.findOne({
      where: { id },
      relations: ["notifications"],
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepo.preload({ id, ...updateClientDto });
    if (!client) {
      throw new NotFoundException("Bunday id client mavjud emas");
    }

    if (updateClientDto.email) {
      client.isActive = false;

      try {
        await this.mailService.sendMail(client);
      } catch (error) {
        console.log(error);
        throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
      }
    }
    return this.clientRepo.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    if (!client) {
      throw new NotFoundException("Bunday id client mavjud emas");
    }
    this.clientRepo.delete(id);
    return {
      message: `${id} li client o'chirildi`,
    };
  }

  findByEmail(email: string) {
    return this.clientRepo.findOneBy({ email });
  }

  async updatePassword(
    id: number,
    updatePasswordClientDto: UpdatePasswordClientDto
  ) {
    const { oldPassword, confirmPassword, newPassword } =
      updatePasswordClientDto;

    const client = await this.findOne(id);

    if (!client) {
      throw new NotFoundException("Bunday client mavjud emas");
    }

    const validPassword = await bcrypt.compare(oldPassword, client.passwordHash)

    if(!validPassword){
      throw new BadRequestException("Parolni xato kiritdingiz")
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException("Parollar bir-birga mos emas");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 7);

    client.passwordHash = hashedPassword;
    this.clientRepo.save(client);
    return {
      message: "Client Paroli o'zgartirildi",
    };
  }

  async generateToken(client: Client) {
    const payload = {
      id: client.id,
      name: client.fullName,
      email: client.email,
      is_active: client.isActive,
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
