import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Branch } from "../../branches/entities/branch.entity";
import { ServiceSchedule } from "../../service-schedule/entities/service-schedule.entity";
import { Ticket } from "../../tickets/entities/ticket.entity";
import { Staff } from "../../staff/entities/staff.entity";

@Entity()
export class Service {
  @ApiProperty({
    example: 1,
    description: "Xizmat ID raqami (avtomatik yaratiladi)",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: "Filial ID raqami",
  })
  @Column()
  branchId: number;

  @ApiProperty({
    example: "SERV001",
    description: "Xizmat kodi",
  })
  @Column()
  code: string;

  @ApiProperty({
    example: "Umumiy maslahat xizmati",
    description: "Xizmat haqida tavsif",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 15,
    description: "Oʻrtacha xizmat ko‘rsatish vaqti (minutlarda)",
  })
  @Column()
  avarageServiceTime: number;

  @ApiProperty({
    example: 50,
    description: "Bir kunlik maksimal xizmat ko‘rsatish soni",
  })
  @Column()
  maxDailyCapacity: number;

  @ApiProperty({
    example: 2,
    description: "Ustuvorlik darajasi (1 - past, 2 - o‘rta, 3 - yuqori)",
  })
  @Column()
  priorityLevel: number;

  @ApiProperty({
    example: true,
    description: "Xizmat faolmi yoki yo‘q",
    default: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(()=>Branch, (branch)=>branch.services)
  branch: Branch

  @ManyToOne(()=> Staff, (staff)=> staff.service)
  staff: Staff

  @OneToMany(()=> ServiceSchedule, (serviceSchedule)=> serviceSchedule.service)
  serviceSchedule: ServiceSchedule[]

  @OneToMany(()=> Ticket, (ticket)=> ticket.service)
  ticket: Ticket[]


}
