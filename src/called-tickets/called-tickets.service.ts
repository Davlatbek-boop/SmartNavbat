import { Injectable } from '@nestjs/common';
import { CreateCalledTicketDto } from './dto/create-called-ticket.dto';
import { UpdateCalledTicketDto } from './dto/update-called-ticket.dto';

@Injectable()
export class CalledTicketsService {
  create(createCalledTicketDto: CreateCalledTicketDto) {
    return 'This action adds a new calledTicket';
  }

  findAll() {
    return `This action returns all calledTickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calledTicket`;
  }

  update(id: number, updateCalledTicketDto: UpdateCalledTicketDto) {
    return `This action updates a #${id} calledTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} calledTicket`;
  }
}
