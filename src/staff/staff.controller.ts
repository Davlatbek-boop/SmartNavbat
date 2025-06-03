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
  UseGuards,
} from "@nestjs/common";
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { LoginStaffDto } from "./dto/login-staff.dto";
import { Request, Response } from "express";
import { UpdatePasswordStaffDto } from "./dto/update-password-staff.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { StaffSelfGuard } from "../common/guards/staff-self.guard";

@ApiTags("Staff")
@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiBearerAuth()
  @Roles("hr_meneger", "admin")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post("registratsiya")
  @ApiOperation({
    summary: "Yangi xodim yaratish",
    description: "hr_meneger huquqi bor ",
  })
  @ApiResponse({ status: 201, description: "Xodim muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Yaroqsiz maʼlumotlar" })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.registratsiya(createStaffDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Xodim login qilish" })
  @ApiBody({ type: LoginStaffDto })
  @ApiResponse({ status: 200, description: "Login muvaffaqiyatli" })
  @ApiResponse({ status: 401, description: "Login yoki parol noto‘g‘ri" })
  loginStaff(
    @Body() loginStaffDto: LoginStaffDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request
  ) {
    return this.staffService.loginStaff(loginStaffDto, res, req);
  }

  @Get("logout")
  @ApiOperation({ summary: "Xodim logout qilish" })
  @ApiResponse({ status: 200, description: "Logout muvaffaqiyatli bajarildi" })
  logoutStaff(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.staffService.logoutStaff(req, res);
  }

  @Post("refresh-token")
  @ApiOperation({ summary: "Tokenni yangilash" })
  @ApiResponse({ status: 200, description: "Token yangilandi" })
  refreshTokenStaff(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.staffService.refreshTokenStaff(req, res);
  }

  @ApiBearerAuth()
  @Roles("admin", "hr_meneger")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: "Barcha xodimlarni olish",
    description: "admin va hr_meneger huquqi bor ",
  })
  @ApiResponse({ status: 200, description: "Xodimlar ro‘yxati" })
  findAll() {
    return this.staffService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(StaffSelfGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({
    summary: "ID bo‘yicha bitta xodimni olish",
    description: "admin, staffning faqat o'zini malumotlariga huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Xodim ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim topildi" })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(StaffSelfGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({
    summary: "Xodim maʼlumotlarini yangilash",
    description: "admin, staffning faqat o'zini malumotlariga huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Xodim ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim yangilandi" })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @ApiBearerAuth()
  @Roles("admin", "hr_meneger")
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({
    summary: "Xodimni o‘chirish",
    description: "hr_meneger huquqi bor ",
  })
  @ApiParam({ name: "id", type: Number, description: "Xodim ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim o‘chirildi" })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(StaffSelfGuard)
  @UseGuards(AuthGuard)
  @Patch("update/password/:id")
  @ApiOperation({
    summary: "Xodim parolini yangilash",
    description: "admin, staffning faqat o'zini malumotlariga huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Xodim ID raqami" })
  @ApiBody({ type: UpdatePasswordStaffDto })
  @ApiResponse({ status: 200, description: "Parol muvaffaqiyatli yangilandi" })
  @ApiResponse({
    status: 400,
    description: "Noto‘g‘ri eski parol yoki ma’lumot",
  })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  updatePassword(
    @Param("id") id: string,
    @Body() updatePasswordStaffDto: UpdatePasswordStaffDto
  ) {
    return this.staffService.updatePassword(+id, updatePasswordStaffDto);
  }
}
