import { ApiProperty } from "@nestjs/swagger";
import { Field } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "../../clients/entities/client.entity";

@Entity()
export class Notification {
  @ApiProperty({ example: 1, description: "Unikal xabar ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 101, description: "Mijoz ID raqami (clientId)" })
  @Column()
  clientId: number;

  @ApiProperty({
    example: "Sizga yangi xabar bor!",
    description: "Yuborilgan xabar matni",
  })
  @Column()
  message: string;

  @ApiProperty({
    example: "email",
    description: "Xabar yuborish kanali (email, sms, telegram)",
  })
  @Column()
  via: string;

  @ApiProperty({
    example: "sent",
    description: "Xabar holati (sent, failed, pending)",
  })
  @Column()
  status: string;

  @ApiProperty({
    example: "2025-05-30T10:00:00Z",
    description: "Xabar qachon yuborilgan",
    type: String,
  })
  @Column()
  sentAt: Date;

  @ApiProperty({
    example: "2025-05-30T09:55:00Z",
    description: "Yaratilgan vaqti",
    type: String,
  })
  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-30T09:57:00Z",
    description: "So‘nggi yangilangan vaqti",
    type: String,
  })
  @Field()
  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToOne((type)=>Client, (client)=> client.notifications)
  client: Client
}
