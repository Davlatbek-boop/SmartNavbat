import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { BranchesModule } from '../branches/branches.module';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), BranchesModule, StaffModule],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports:[ServicesService]
})
export class ServicesModule {}
