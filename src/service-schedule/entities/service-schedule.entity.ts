import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../services/entities/service.entity";

@Entity()
export class ServiceSchedule {
  @ApiProperty({
    example: 1,
    description: "Jadval ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 3,
    description: "Xizmat ID raqami",
  })
  @Column()
  serviceId: number;

  @ApiProperty({
    example: "Monday",
    description: "Haftaning kuni (Ingliz tilida: Monday, Tuesday, ...)",
  })
  @Column()
  dayOfWeek: string;

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Xizmat boshlanish vaqti",
  })
  @Column()
  startTime: Date;

  @ApiProperty({
    example: "2025-06-01T18:00:00.000Z",
    description: "Xizmat tugash vaqti",
  })
  @Column()
  endTime: Date;

  @ApiProperty({
    example: "2025-06-01T13:00:00.000Z",
    description: "Tushlik boshlanish vaqti",
  })
  @Column()
  breakStart: Date;

  @ApiProperty({
    example: "2025-06-01T14:00:00.000Z",
    description: "Tushlik tugash vaqti",
  })
  @Column()
  breakEnd: Date;

  @ApiProperty({
    example: true,
    description: "Jadval faolmi yoki yo‘q (default: true)",
  })
  @Column({ default: true })
  isActive: boolean;


  @ManyToOne(()=> Service, (service)=>service.serviceSchedule)
  service: Service
}
