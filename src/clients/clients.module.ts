import { Module } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { ClientsController } from "./clients.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./entities/client.entity";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    JwtModule.register({ global: true }),
    MailModule
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService]
})
export class ClientsModule {}
