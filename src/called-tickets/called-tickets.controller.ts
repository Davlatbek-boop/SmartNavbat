import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CalledTicketsService } from "./called-tickets.service";
import { CreateCalledTicketDto } from "./dto/create-called-ticket.dto";
import { UpdateCalledTicketDto } from "./dto/update-called-ticket.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { CalledTicket } from "./entities/called-ticket.entity";

@ApiTags("Called Tickets")
@Controller("called-tickets")
export class CalledTicketsController {
  constructor(private readonly calledTicketsService: CalledTicketsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi chaqirilgan ticket yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi ticket muvaffaqiyatli yaratildi",
    type: CalledTicket,
  })
  create(@Body() createCalledTicketDto: CreateCalledTicketDto) {
    return this.calledTicketsService.create(createCalledTicketDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha chaqirilgan ticketlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha ticketlar ro‘yxati",
    type: [CalledTicket],
  })
  findAll() {
    return this.calledTicketsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta ticketni olish" })
  @ApiParam({ name: "id", type: Number, description: "Ticket ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Topilgan ticket",
    type: CalledTicket,
  })
  @ApiResponse({ status: 404, description: "Ticket topilmadi" })
  findOne(@Param("id") id: string) {
    return this.calledTicketsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Ticket maʼlumotlarini yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Yangilanadigan ticket ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Ticket yangilandi",
    type: CalledTicket,
  })
  update(
    @Param("id") id: string,
    @Body() updateCalledTicketDto: UpdateCalledTicketDto
  ) {
    return this.calledTicketsService.update(+id, updateCalledTicketDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Ticketni o‘chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "O‘chiriladigan ticket ID raqami",
  })
  @ApiResponse({ status: 200, description: "Ticket o‘chirildi" })
  @ApiResponse({ status: 404, description: "Ticket topilmadi" })
  remove(@Param("id") id: string) {
    return this.calledTicketsService.remove(+id);
  }
}
