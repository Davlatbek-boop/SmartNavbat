import { PartialType } from '@nestjs/swagger';
import { CreateCalledTicketDto } from './create-called-ticket.dto';

export class UpdateCalledTicketDto extends PartialType(CreateCalledTicketDto) {}
