import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Roles") // Swagger UI'da "Roles" bo‘limi sifatida chiqadi
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi rol yaratish" })
  @ApiResponse({ status: 201, description: "Rol muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Noto‘g‘ri ma’lumot yuborildi" })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha rollarni olish" })
  @ApiResponse({ status: 200, description: "Rollar ro‘yxati qaytarildi" })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta rolni olish" })
  @ApiParam({ name: "id", type: Number, description: "Rol ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan rol qaytarildi" })
  @ApiResponse({ status: 404, description: "Rol topilmadi" })
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha rolni yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Rol ID raqami" })
  @ApiResponse({ status: 200, description: "Rol muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Rol topilmadi" })
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha rolni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Rol ID raqami" })
  @ApiResponse({ status: 200, description: "Rol muvaffaqiyatli o‘chirildi" })
  @ApiResponse({ status: 404, description: "Rol topilmadi" })
  remove(@Param("id") id: string) {
    return this.rolesService.remove(+id);
  }
}
