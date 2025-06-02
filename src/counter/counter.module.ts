import { Module } from "@nestjs/common";
import { CounterService } from "./counter.service";
import { CounterController } from "./counter.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Counter } from "./entities/counter.entity";
import { BranchesModule } from "../branches/branches.module";

@Module({
  imports: [TypeOrmModule.forFeature([Counter]), BranchesModule],
  controllers: [CounterController],
  providers: [CounterService],
  exports: [CounterService],
})
export class CounterModule {}
