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
import { TicketsService } from "./tickets.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiBearerAuth()
@ApiTags("Tickets")
@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(AuthGuard)
  @Post(":id")
  @ApiOperation({
    summary: "Yangi chipta yaratish",
    description:
      "Bu endpoint faqat clientlar uchun muljallangan roli uchun mo‘ljallangan. Token yuborilishi shart.",
  })
  @ApiResponse({ status: 201, description: "Chipta muvaffaqiyatli yaratildi" })
  create(@Param('id') id: string, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(+id, createTicketDto);
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
