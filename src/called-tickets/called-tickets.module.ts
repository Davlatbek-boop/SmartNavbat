import { Module } from "@nestjs/common";
import { CalledTicketsService } from "./called-tickets.service";
import { CalledTicketsController } from "./called-tickets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CalledTicket } from "./entities/called-ticket.entity";
import { StaffModule } from "../staff/staff.module";
import { TicketsModule } from "../tickets/tickets.module";
import { CounterModule } from "../counter/counter.module";
import { MailModule } from "../mail/mail.module";
import { ClientsModule } from "../clients/clients.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([CalledTicket]),
    StaffModule,
    TicketsModule,
    CounterModule,
    MailModule,
    ClientsModule
  ],
  controllers: [CalledTicketsController],
  providers: [CalledTicketsService],
})
export class CalledTicketsModule {}
