import { Module } from '@nestjs/common';
import { TicketStatusLogService } from './ticket-status-log.service';
import { TicketStatusLogController } from './ticket-status-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketStatusLog } from './entities/ticket-status-log.entity';
import { StaffModule } from '../staff/staff.module';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketStatusLog]), StaffModule, TicketsModule],
  controllers: [TicketStatusLogController],
  providers: [TicketStatusLogService],
})
export class TicketStatusLogModule {}
 