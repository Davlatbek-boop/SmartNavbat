import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { LoginClientDto } from "./dto/login-client.dto";
import { Client } from "./entities/client.entity";
import { Request, Response } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { UpdatePasswordClientDto } from "./dto/update-password-client.dto";

@ApiTags("Clients")
@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi mijoz yaratish" })
  @ApiResponse({
    status: 201,
    description: "Mijoz muvaffaqiyatli yaratildi.",
    type: Client,
  })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma'lumotlar" })
  @ApiBody({ type: CreateClientDto })
  registratsiya(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.registratsiya(createClientDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Mijoz login qilish" })
  @ApiResponse({ status: 200, description: "Login muvaffaqiyatli" })
  @ApiResponse({ status: 401, description: "Login yoki parol noto‘g‘ri" })
  @ApiBody({ type: LoginClientDto })
  loginClient(
    @Body() loginClientDto: LoginClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientsService.loginClient(loginClientDto, res);
  }

  @Get("logout")
  @ApiOperation({ summary: "Mijoz logout qilish" })
  @ApiResponse({ status: 200, description: "Logout muvaffaqiyatli" })
  logoutClient(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.clientsService.logoutClient(req, res);
  }

  @Get("activate/:link")
  @ApiOperation({ summary: "Email orqali mijozni aktivatsiya qilish" })
  @ApiParam({
    name: "link",
    description: "Foydalanuvchining aktivatsiya tokeni",
    example: "f3a3c80d-4f3c-4b0f-8e02-123456abcdef",
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi aktivatsiya qilindi",
  })
  @ApiResponse({ status: 400, description: "Aktivatsiya linki noto‘g‘ri" })
  activateClient(@Param("link") link: string) {
    return this.clientsService.activateClient(link);
  }

  @Post("refresh-token")
  @ApiOperation({ summary: "Refresh token orqali tokenlarni yangilash" })
  @ApiResponse({ status: 200, description: "Tokenlar yangilandi" })
  refreshTokenClient(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientsService.refreshTokenClient(req, res);
  }

  @Get()
  @ApiOperation({ summary: "Barcha mijozlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Mijozlar ro‘yxati",
    type: [Client],
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta mijozni olish" })
  @ApiParam({ name: "id", type: Number, description: "Mijoz ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Topilgan mijoz ma‘lumotlari",
    type: Client,
  })
  @ApiResponse({ status: 404, description: "Mijoz topilmadi" })
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Mijoz ma‘lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Yangilanishi kerak bo‘lgan mijoz ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Mijoz ma‘lumotlari yangilandi",
    type: Client,
  })
  @ApiResponse({ status: 404, description: "Mijoz topilmadi" })
  @ApiBody({ type: UpdateClientDto })
  update(@Param("id") id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Mijozni o‘chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "O‘chirilishi kerak bo‘lgan mijoz ID raqami",
  })
  @ApiResponse({ status: 200, description: "Mijoz o‘chirildi" })
  @ApiResponse({ status: 404, description: "Mijoz topilmadi" })
  remove(@Param("id") id: string) {
    return this.clientsService.remove(+id);
  }

  @Patch("update-password/:id")
  @ApiOperation({ summary: "Client parolini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Clientning ID raqami" })
  @ApiBody({
    type: UpdatePasswordClientDto,
    description: "Yangi parol va uning tasdig‘i",
  })
  @ApiResponse({ status: 200, description: "Parol muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 400, description: "Parollar mos emas yoki yaroqsiz" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  updatePassword(
    @Param("id") id: string,
    @Body() updatePasswordClientdto: UpdatePasswordClientDto
  ) {
    return this.clientsService.updatePassword(+id, updatePasswordClientdto);
  }
}
