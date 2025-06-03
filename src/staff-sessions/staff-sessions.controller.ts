import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { StaffSessionsService } from "./staff-sessions.service";
import { CreateStaffSessionDto } from "./dto/create-staff-session.dto";
import { UpdateStaffSessionDto } from "./dto/update-staff-session.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiBearerAuth()
@Roles("hr_meneger", "admin", "branch_manager")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@ApiTags("Staff Sessions")
@Controller("staff-sessions")
export class StaffSessionsController {
  constructor(private readonly staffSessionsService: StaffSessionsService) {}

  // @Post()
  // @ApiOperation({ summary: "Yangi xodim sessiyasini yaratish" })
  // @ApiResponse({ status: 201, description: "Sessiya muvaffaqiyatli yaratildi" })
  // @ApiResponse({ status: 400, description: "Noto‘g‘ri maʼlumot" })
  // create(@Body() createStaffSessionDto: CreateStaffSessionDto) {
  //   return this.staffSessionsService.create(createStaffSessionDto);
  // }

  @Get()
  @ApiOperation({
    summary: "Barcha xodim sessiyalarini olish",
    description: "bu routga branch_manager, hr_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 200, description: "Sessiyalar ro‘yxati" })
  findAll() {
    return this.staffSessionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "ID bo‘yicha bitta sessiyani olish",
    description: "bu routga branch_manager, hr_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Sessiya ID raqami" })
  @ApiResponse({ status: 200, description: "Sessiya topildi" })
  @ApiResponse({ status: 404, description: "Sessiya topilmadi" })
  findOne(@Param("id") id: string) {
    return this.staffSessionsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Xodim sessiyasini yangilash",
    description: "bu routga branch_manager, hr_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Sessiya ID raqami" })
  @ApiResponse({ status: 200, description: "Sessiya yangilandi" })
  @ApiResponse({ status: 404, description: "Sessiya topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateStaffSessionDto: UpdateStaffSessionDto
  ) {
    return this.staffSessionsService.update(+id, updateStaffSessionDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Xodim sessiyasini o‘chirish",
    description: "bu routga branch_manager, hr_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Sessiya ID raqami" })
  @ApiResponse({ status: 200, description: "Sessiya o‘chirildi" })
  @ApiResponse({ status: 404, description: "Sessiya topilmadi" })
  remove(@Param("id") id: string) {
    return this.staffSessionsService.remove(+id);
  }
}
