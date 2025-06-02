import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CalledTicket {
  @ApiProperty({ example: 1, description: "Unikal ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 101,
    description: "Chaqirilgan ticketning ID raqami",
  })
  @Column()
  ticketId: number;

  @ApiProperty({ example: 5, description: "Xodim (staff) ID raqami" })
  @Column()
  staffId: number;

  @ApiProperty({ example: 3, description: "Counter (kassa) ID raqami" })
  @Column()
  counterId: number;

  @ApiProperty({
    example: "2025-06-02T10:30:00Z",
    description: "Qachon chaqirilgan (vaqt)",
  })
  @Column()
  calledAt: Date;

  @ApiProperty({ example: true, description: "Ekranga chiqganligi holati" })
  @Column({default: true})
  displayedOnScreen: boolean;
}
