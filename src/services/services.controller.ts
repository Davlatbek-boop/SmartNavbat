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
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiBearerAuth()
@Roles("branch_manager", "admin")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@ApiTags("Services")
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({
    summary: "Yangi xizmat qo‘shish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 201, description: "Xizmat muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik yuz berdi" })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({
    summary: "Barcha xizmatlarni olish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 200, description: "Xizmatlar ro‘yxati" })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "ID bo‘yicha xizmatni olish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 200, description: "Xizmat topildi" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Xizmat maʼlumotlarini yangilash",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 200, description: "Xizmat muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Xizmatni o‘chirish",
    description: "bu routga branch_meneger va admin huquqi bor",
  })
  @ApiResponse({ status: 200, description: "Xizmat o‘chirildi" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
