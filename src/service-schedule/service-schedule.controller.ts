import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ServiceScheduleService } from "./service-schedule.service";
import { CreateServiceScheduleDto } from "./dto/create-service-schedule.dto";
import { UpdateServiceScheduleDto } from "./dto/update-service-schedule.dto";

@ApiTags("Service Schedule") // Swagger bo‘lim nomi
@Controller("service-schedule")
export class ServiceScheduleController {
  constructor(
    private readonly serviceScheduleService: ServiceScheduleService
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi xizmat jadvalini yaratish" })
  @ApiResponse({ status: 201, description: "Jadval muvaffaqiyatli yaratildi" })
  create(@Body() createServiceScheduleDto: CreateServiceScheduleDto) {
    return this.serviceScheduleService.create(createServiceScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xizmat jadvallarini olish" })
  @ApiResponse({ status: 200, description: "Jadvallar ro‘yxati" })
  findAll() {
    return this.serviceScheduleService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Xizmat jadvalini ID bo‘yicha olish" })
  @ApiParam({ name: "id", description: "Jadval ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan jadval" })
  @ApiResponse({ status: 404, description: "Jadval topilmadi" })
  findOne(@Param("id") id: string) {
    return this.serviceScheduleService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xizmat jadvalini yangilash" })
  @ApiParam({ name: "id", description: "Jadval ID raqami" })
  @ApiResponse({ status: 200, description: "Jadval muvaffaqiyatli yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updateServiceScheduleDto: UpdateServiceScheduleDto
  ) {
    return this.serviceScheduleService.update(+id, updateServiceScheduleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xizmat jadvalini o‘chirish" })
  @ApiParam({ name: "id", description: "Jadval ID raqami" })
  @ApiResponse({ status: 200, description: "Jadval o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.serviceScheduleService.remove(+id);
  }
}
