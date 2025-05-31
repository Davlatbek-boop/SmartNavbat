import { forwardRef, Module } from "@nestjs/common";
import { StaffSessionsService } from "./staff-sessions.service";
import { StaffSessionsController } from "./staff-sessions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StaffSession } from "./entities/staff-session.entity";
import { StaffModule } from "../staff/staff.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([StaffSession]),
    forwardRef(() => StaffModule),
  ],
  controllers: [StaffSessionsController],
  providers: [StaffSessionsService],
  exports: [StaffSessionsService],
})
export class StaffSessionsModule {}
