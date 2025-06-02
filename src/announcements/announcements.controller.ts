import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AnnouncementsService } from "./announcements.service";
import { CreateAnnouncementDto } from "./dto/create-announcement.dto";
import { UpdateAnnouncementDto } from "./dto/update-announcement.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Eʼlonlar")
@Controller("announcements")
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi eʼlon yaratish" })
  @ApiResponse({ status: 201, description: "Eʼlon muvaffaqiyatli yaratildi" })
  @ApiBody({ type: CreateAnnouncementDto })
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha eʼlonlarni olish" })
  @ApiResponse({ status: 200, description: "Eʼlonlar roʻyxati" })
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta eʼlonni olish" })
  @ApiParam({ name: "id", type: Number, description: "Eʼlon ID raqami" })
  @ApiResponse({ status: 200, description: "Eʼlon topildi" })
  @ApiResponse({ status: 404, description: "Eʼlon topilmadi" })
  findOne(@Param("id") id: string) {
    return this.announcementsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Eʼlonni yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Eʼlon ID raqami" })
  @ApiBody({ type: UpdateAnnouncementDto })
  @ApiResponse({ status: 200, description: "Eʼlon yangilandi" })
  @ApiResponse({ status: 404, description: "Eʼlon topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto
  ) {
    return this.announcementsService.update(+id, updateAnnouncementDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eʼlonni o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Eʼlon ID raqami" })
  @ApiResponse({ status: 200, description: "Eʼlon o‘chirildi" })
  @ApiResponse({ status: 404, description: "Eʼlon topilmadi" })
  remove(@Param("id") id: string) {
    return this.announcementsService.remove(+id);
  }
}
