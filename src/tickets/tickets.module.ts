import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { TicketsController } from "./tickets.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { ServicesModule } from "../services/services.module";
import { BranchesModule } from "../branches/branches.module";
import { ClientsModule } from "../clients/clients.module";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    ServicesModule,
    BranchesModule,
    ClientsModule,
    MailModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
