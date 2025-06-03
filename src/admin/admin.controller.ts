import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { Request, Response } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UpdatePasswordAdminDto } from "./dto/update-password.dto";
import { AdminSelfGuard } from "../common/guards/admin-self.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { CreatorGuard } from "../common/guards/creator.guard";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CreatorGuard)
  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi" })
  @ApiBody({ type: CreateAdminDto })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.registratsiya(createAdminDto);
  }

  @Post("login")
  @HttpCode(200)
  @ApiOperation({ summary: "Admin login qilish" })
  @ApiResponse({ status: 200, description: "Login muvaffaqiyatli" })
  @ApiResponse({ status: 401, description: "Login xatolik" })
  @ApiBody({ type: LoginAdminDto })
  async loginAdmin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.loginAdmin(loginAdminDto, res);
  }

 
  @Post("refresh-token")
  @ApiOperation({ summary: "Access tokenni refresh qilish" })
  @ApiResponse({ status: 200, description: "Token yangilandi" })
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.refreshToken(req, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @Get("logout")
  @ApiOperation({ summary: "Admin logout qilish" })
  @ApiResponse({ status: 200, description: "Logout muvaffaqiyatli" })
  async logoutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.logoutAdmin(req, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CreatorGuard)
  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Adminlar ro‘yxati" })
  findAll() {
    return this.adminService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @Get(":id")
  @ApiOperation({ summary: "Bitta adminni olish" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Admin topildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Adminni yangilash" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: "Admin yangilandi" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CreatorGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Admin o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminSelfGuard)
  @Patch("update-password/:id")
  @ApiOperation({ summary: "Admin parolini yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Adminning ID raqami" })
  @ApiBody({
    type: UpdatePasswordAdminDto,
    description: "Yangi parol va uning tasdig‘i",
  })
  @ApiResponse({ status: 200, description: "Parol muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 400, description: "Parollar mos emas yoki yaroqsiz" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  updatePassword(
    @Param("id") id: string,
    @Body() updatePasswordAdminDto: UpdatePasswordAdminDto
  ) {
    return this.adminService.updatePassword(+id, updatePasswordAdminDto);
  }
}
