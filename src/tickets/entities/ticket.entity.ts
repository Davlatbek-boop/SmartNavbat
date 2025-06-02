import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "../../clients/entities/client.entity";
import { Service } from "../../services/entities/service.entity";
import { Branch } from "../../branches/entities/branch.entity";

@Entity()
export class Ticket {
  @ApiProperty({ example: 1, description: "Chiptaning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "101", description: "Chiptaning tartib raqami" })
  @Column({ name: 'ticket_number' })
  ticketNumber: number;

  @ApiProperty({ example: "101", description: "Chiptaning tartib raqami" })
  @Column({ name: 'ticket_code' })
  ticketCode: string;

  @ApiProperty({ example: 15, description: "Mijoz ID raqami" })
  @Column()
  clientId: number;

  @ApiProperty({ example: 3, description: "Xizmat ID raqami" })
  @Column()
  serviceId: number;

  @ApiProperty({ example: 3, description: "Branch ID raqami" })
  @Column({nullable: true})
  branchId: number;

  @ApiProperty({
    example: "pending",
    description: "Chipta holati (pending, called, completed, canceled)",
  })
  @Column({
    enum: ["pending", "called", "completed", "canceled"],
    default: "pending",
  })
  status: string;

  @ApiProperty({
    example: "2025-06-01T08:30:00.000Z",
    description: "Chiptaning berilgan vaqti",
  })
  @Column()
  issuedAt: Date;

  @ApiProperty({
    example: 2,
    description: "Ustuvorlik darajasi (1 - past, 2 - o‘rta, 3 - yuqori)",
  })
  @Column()
  priorityLevel: number;

  @ApiProperty({
    example: "Mijoz kutishni istamadi",
    description: "Qo‘shimcha izohlar",
  })
  @Column({ default: "" })
  notes: string;

  @ApiProperty({
    example: "2025-06-01T08:35:00.000Z",
    description: "Mijoz chaqirilgan vaqt",
  })
  @Column({ default: null })
  calledAt: Date;

  @ApiProperty({
    example: "2025-06-01T08:50:00.000Z",
    description: "Xizmat yakunlangan vaqt",
  })
  @Column({ default: null })
  completedAt: Date;

  @ApiProperty({
    example: "2025-06-01T08:40:00.000Z",
    description: "Chipta bekor qilingan vaqt",
  })
  @Column({ default: null })
  canceledAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Client, (client) => client.ticket)
  client: Client;

  @ManyToOne(() => Service, (service) => service.ticket)
  service: Service;

  @ManyToOne(() => Branch, (branch) => branch.ticket)
  branch: Branch;
}
