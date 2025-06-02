import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Tickets") // Swaggerdagi grouping uchun
@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi chipta yaratish" })
  @ApiResponse({ status: 201, description: "Chipta muvaffaqiyatli yaratildi" })
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha chiptalarni olish" })
  @ApiResponse({ status: 200, description: "Chiptalar ro‘yxati qaytarildi" })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta chiptani olish" })
  @ApiParam({ name: "id", description: "Chipta ID raqami" })
  @ApiResponse({ status: 200, description: "Topilgan chipta" })
  @ApiResponse({ status: 404, description: "Chipta topilmadi" })
  findOne(@Param("id") id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Chiptani yangilash" })
  @ApiParam({ name: "id", description: "Chipta ID raqami" })
  @ApiResponse({ status: 200, description: "Chipta muvaffaqiyatli yangilandi" })
  update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(+id, updateTicketDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Chiptani o‘chirish" })
  @ApiParam({ name: "id", description: "Chipta ID raqami" })
  @ApiResponse({ status: 200, description: "Chipta o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.ticketsService.remove(+id);
  }
}
