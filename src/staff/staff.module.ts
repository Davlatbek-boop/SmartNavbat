import { forwardRef, Module } from "@nestjs/common";
import { StaffService } from "./staff.service";
import { StaffController } from "./staff.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Staff } from "./entities/staff.entity";
import { JwtModule } from "@nestjs/jwt";
import { RolesModule } from "../roles/roles.module";
import { BranchesModule } from "../branches/branches.module";
import { StaffSessionsModule } from "../staff-sessions/staff-sessions.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff]),
    JwtModule.register({ global: true }),
    RolesModule,
    BranchesModule,
    forwardRef(() => StaffSessionsModule)
  ],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
