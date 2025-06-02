import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Services") // Swagger'da bo‘lim nomi
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xizmat qo‘shish" })
  @ApiResponse({ status: 201, description: "Xizmat muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik yuz berdi" })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xizmatlarni olish" })
  @ApiResponse({ status: 200, description: "Xizmatlar ro‘yxati" })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha xizmatni olish" })
  @ApiResponse({ status: 200, description: "Xizmat topildi" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xizmat maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Xizmat muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xizmatni o‘chirish" })
  @ApiResponse({ status: 200, description: "Xizmat o‘chirildi" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
