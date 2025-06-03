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
import { TicketStatusLogService } from "./ticket-status-log.service";
import { CreateTicketStatusLogDto } from "./dto/create-ticket-status-log.dto";
import { UpdateTicketStatusLogDto } from "./dto/update-ticket-status-log.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { NotClientGuard } from "../common/guards/not-client.guard";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiBearerAuth()
@UseGuards(NotClientGuard)
@UseGuards(AuthGuard)
@ApiTags("Ticket Status Logs")
@Controller("ticket-status-log")
export class TicketStatusLogController {
  constructor(
    private readonly ticketStatusLogService: TicketStatusLogService
  ) {}

  @Post()
  @ApiOperation({
    summary: "Yangi ticket status log yaratish",
    description: "stafflar va adminlar ruxsati bor",
  })
  @ApiResponse({ status: 201, description: "Yaratildi" })
  @ApiBody({ type: CreateTicketStatusLogDto })
  create(@Body() createTicketStatusLogDto: CreateTicketStatusLogDto) {
    return this.ticketStatusLogService.create(createTicketStatusLogDto);
  }

  @Get()
  @ApiOperation({
    summary: "Barcha ticket status loglarni olish",
    description: "stafflar va adminlar ruxsati bor",
  })
  @ApiResponse({ status: 200, description: "Muvaffaqiyatli" })
  findAll() {
    return this.ticketStatusLogService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "ID bo‘yicha ticket status logni olish",
    description: "stafflar va adminlar ruxsati bor",
  })
  @ApiResponse({ status: 200, description: "Topildi" })
  @ApiParam({ name: "id", type: Number, description: "TicketStatusLog ID" })
  findOne(@Param("id") id: string) {
    return this.ticketStatusLogService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "ID bo‘yicha ticket status logni yangilash",
    description: "stafflar va adminlar ruxsati bor",
  })
  @ApiResponse({ status: 200, description: "Yangilandi" })
  @ApiParam({ name: "id", type: Number, description: "TicketStatusLog ID" })
  @ApiBody({ type: UpdateTicketStatusLogDto })
  update(
    @Param("id") id: string,
    @Body() updateTicketStatusLogDto: UpdateTicketStatusLogDto
  ) {
    return this.ticketStatusLogService.update(+id, updateTicketStatusLogDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "ID bo‘yicha ticket status logni o‘chirish",
    description: "stafflar va adminlar ruxsati bor",
  })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  @ApiParam({ name: "id", type: Number, description: "TicketStatusLog ID" })
  remove(@Param("id") id: string) {
    return this.ticketStatusLogService.remove(+id);
  }
}
