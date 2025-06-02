import { Module } from '@nestjs/common';
import { CalledTicketsService } from './called-tickets.service';
import { CalledTicketsController } from './called-tickets.controller';

@Module({
  controllers: [CalledTicketsController],
  providers: [CalledTicketsService],
})
export class CalledTicketsModule {}
