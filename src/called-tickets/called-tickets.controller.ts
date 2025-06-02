import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalledTicketsService } from './called-tickets.service';
import { CreateCalledTicketDto } from './dto/create-called-ticket.dto';
import { UpdateCalledTicketDto } from './dto/update-called-ticket.dto';

@Controller('called-tickets')
export class CalledTicketsController {
  constructor(private readonly calledTicketsService: CalledTicketsService) {}

  @Post()
  create(@Body() createCalledTicketDto: CreateCalledTicketDto) {
    return this.calledTicketsService.create(createCalledTicketDto);
  }

  @Get()
  findAll() {
    return this.calledTicketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calledTicketsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalledTicketDto: UpdateCalledTicketDto) {
    return this.calledTicketsService.update(+id, updateCalledTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calledTicketsService.remove(+id);
  }
}
