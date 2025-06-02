import { Module } from '@nestjs/common';
import { ServiceScheduleService } from './service-schedule.service';
import { ServiceScheduleController } from './service-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceSchedule } from './entities/service-schedule.entity';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceSchedule]), ServicesModule],
  controllers: [ServiceScheduleController],
  providers: [ServiceScheduleService],
})
export class ServiceScheduleModule {}
