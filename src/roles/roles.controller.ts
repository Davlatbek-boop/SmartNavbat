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
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
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
@Roles("branch_manager", "admin")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({
    summary: "Yangi rol yaratish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 201, description: "Rol muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumot yuborildi" })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({
    summary: "Barcha rollarni olish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 200, description: "Rollar ro‘yxati qaytarildi" })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "ID bo‘yicha bitta rolni olish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Rol ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan rol qaytarildi" })
  @ApiResponse({ status: 404, description: "Rol topilmadi" })
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "ID bo‘yicha rolni yangilash",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Rol ID raqami" })
  @ApiResponse({ status: 200, description: "Rol muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Rol topilmadi" })
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "ID bo‘yicha rolni o‘chirish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiParam({ name: "id", type: Number, description: "Rol ID raqami" })
  @ApiResponse({ status: 200, description: "Rol muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Rol topilmadi" })
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
