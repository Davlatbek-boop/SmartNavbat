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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ServiceScheduleService } from "./service-schedule.service";
import { CreateServiceScheduleDto } from "./dto/create-service-schedule.dto";
import { UpdateServiceScheduleDto } from "./dto/update-service-schedule.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles-auth.decorator";

@ApiBearerAuth()
@Roles("manager", "admin", "hr_manager")
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@ApiTags("Service Schedule")
@Controller("service-schedule")
export class ServiceScheduleController {
  constructor(
    private readonly serviceScheduleService: ServiceScheduleService
  ) {}

  @Post()
  @ApiOperation({
    summary: "Yangi xizmat jadvalini yaratish",
    description: "manager, admin, hr_managar huquqi bor",
  })
  @ApiResponse({ status: 201, description: "Jadval muvaffaqiyatli yaratildi" })
  create(@Body() createServiceScheduleDto: CreateServiceScheduleDto) {
    return this.serviceScheduleService.create(createServiceScheduleDto);
  }

  @Get()
  @ApiOperation({
    summary: "Barcha xizmat jadvallarini olish",
    description: "manager, admin, hr_manager huquqi bor",
  })
  @ApiResponse({ status: 200, description: "Jadvallar ro‘yxati" })
  findAll() {
    return this.serviceScheduleService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Xizmat jadvalini ID bo‘yicha olish",
    description: "manager, admin, hr_manager huquqi bor",
  })
  @ApiParam({ name: "id", description: "Jadval ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan jadval" })
  @ApiResponse({ status: 404, description: "Jadval topilmadi" })
  findOne(@Param("id") id: string) {
    return this.serviceScheduleService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Xizmat jadvalini yangilash",
    description: "manager, admin, hr_manager huquqi bor",
  })
  @ApiParam({ name: "id", description: "Jadval ID raqami" })
  @ApiResponse({ status: 200, description: "Jadval muvaffaqiyatli yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updateServiceScheduleDto: UpdateServiceScheduleDto
  ) {
    return this.serviceScheduleService.update(+id, updateServiceScheduleDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Xizmat jadvalini o‘chirish",
    description: "manager, admin, hr_manager huquqi bor",
  })
  @ApiParam({ name: "id", description: "Jadval ID raqami" })
  @ApiResponse({ status: 200, description: "Jadval o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.serviceScheduleService.remove(+id);
  }
}
