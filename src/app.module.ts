import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/entities/admin.entity";
import { NotificationsModule } from "./notifications/notifications.module";
import { ClientsModule } from "./clients/clients.module";
import { Notification } from "./notifications/entities/notification.entity";
import { Client } from "./clients/entities/client.entity";
import { BranchesModule } from "./branches/branches.module";
import { Branch } from "./branches/entities/branch.entity";
import { StaffModule } from "./staff/staff.module";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/entities/role.entity";
import { Staff } from "./staff/entities/staff.entity";
import { StaffSessionsModule } from "./staff-sessions/staff-sessions.module";
import { StaffSession } from "./staff-sessions/entities/staff-session.entity";
import { AnnouncementsModule } from "./announcements/announcements.module";
import { Announcement } from "./announcements/entities/announcement.entity";
import { ServicesModule } from "./services/services.module";
import { Service } from "./services/entities/service.entity";
import { ServiceScheduleModule } from "./service-schedule/service-schedule.module";
import { CounterModule } from "./counter/counter.module";
import { Counter } from "./counter/entities/counter.entity";
import { TicketsModule } from "./tickets/tickets.module";
import { Ticket } from "./tickets/entities/ticket.entity";
import { CalledTicketsModule } from "./called-tickets/called-tickets.module";
import { CalledTicket } from "./called-tickets/entities/called-ticket.entity";
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from "./feedback/entities/feedback.entity";
import { TicketStatusLogModule } from './ticket-status-log/ticket-status-log.module';
import { TicketStatusLog } from "./ticket-status-log/entities/ticket-status-log.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      autoLoadEntities: true,
      entities: [
        Admin,
        Notification,
        Client,
        Branch,
        Role,
        Staff,
        StaffSession,
        Announcement,
        Service,
        Counter,
        Ticket,
        CalledTicket,
        Feedback,
        TicketStatusLog
      ],
      synchronize: true,
    }),
    AdminModule,
    NotificationsModule,
    ClientsModule,
    BranchesModule,
    StaffModule,
    RolesModule,
    StaffSessionsModule,
    AnnouncementsModule,
    ServicesModule,
    ServiceScheduleModule,
    CounterModule,
    TicketsModule,
    CalledTicketsModule,
    FeedbackModule,
    TicketStatusLogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
