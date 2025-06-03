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
import { CalledTicketsService } from "./called-tickets.service";
import { CreateCalledTicketDto } from "./dto/create-called-ticket.dto";
import { UpdateCalledTicketDto } from "./dto/update-called-ticket.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CalledTicket } from "./entities/called-ticket.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import { NotClientGuard } from "../common/guards/not-client.guard";

@ApiTags("Called Tickets")
@Controller("called-tickets")
export class CalledTicketsController {
  constructor(private readonly calledTicketsService: CalledTicketsService) {}

  @ApiBearerAuth()
  @UseGuards(NotClientGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: "Yangi chaqirilgan ticket yaratish", description:"stafflar, adminlar huquqi bor"})
  @ApiResponse({
    status: 201,
    description: "Yangi ticket muvaffaqiyatli yaratildi",
    type: CalledTicket,
  })
  create(@Body() createCalledTicketDto: CreateCalledTicketDto) {
    return this.calledTicketsService.create(createCalledTicketDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: "Barcha chaqirilgan ticketlarni olish" , description: 'istalga tokeni bori'})
  @ApiResponse({
    status: 200,
    description: "Barcha ticketlar ro‘yxati",
    type: [CalledTicket],
  })
  findAll() {
    return this.calledTicketsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(NotClientGuard)
  @UseGuards(AuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta ticketni olish", description:"stafflar, adminlar huquqi bor" })
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

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Ticket maʼlumotlarini yangilash", description: "faqat adminlarga huquq bor" })
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

  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Ticketni o‘chirish" , description: "faqat adminlarga huquq bor"})
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
