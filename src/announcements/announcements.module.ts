import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { StaffModule } from '../staff/staff.module';
import { BranchesModule } from '../branches/branches.module';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement]), StaffModule, BranchesModule],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
})
export class AnnouncementsModule {}
