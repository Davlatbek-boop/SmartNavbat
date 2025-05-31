import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Notifications")
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi notification yaratish" })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({ status: 201, description: "Notification yaratildi." })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha notificationlarni olish" })
  @ApiResponse({ status: 200, description: "Notificationlar ro'yxati." })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha notification olish" })
  @ApiParam({ name: "id", type: Number, description: "Notification ID" })
  @ApiResponse({ status: 200, description: "Notification topildi." })
  @ApiResponse({ status: 400, description: "Notification topilmadi." })
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Get("clientId/:clientId")
  @ApiOperation({ summary: "Mijoz ID bo'yicha notificationlarni olish" })
  @ApiParam({ name: "clientId", type: Number, description: "Mijoz ID" })
  @ApiResponse({
    status: 200,
    description: "Mijozga tegishli notificationlar.",
  })
  findByClientId(@Param("clientId") clientId: string) {
    return this.notificationsService.findByClientId(+clientId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Notificationni yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Yangilanadigan notification ID",
  })
  @ApiBody({ type: UpdateNotificationDto })
  @ApiResponse({ status: 200, description: "Notification yangilandi." })
  @ApiResponse({ status: 400, description: "Notification topilmadi." })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Notificationni o'chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "O'chiriladigan notification ID",
  })
  @ApiResponse({ status: 200, description: "Notification o'chirildi." })
  @ApiResponse({ status: 400, description: "Notification topilmadi." })
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(+id);
  }
}
