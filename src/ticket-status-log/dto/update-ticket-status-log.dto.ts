import { PartialType } from '@nestjs/swagger';
import { CreateTicketStatusLogDto } from './create-ticket-status-log.dto';

export class UpdateTicketStatusLogDto extends PartialType(CreateTicketStatusLogDto) {}
