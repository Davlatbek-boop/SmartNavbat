import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Staff } from "../../staff/entities/staff.entity";

@Entity()
export class StaffSession {
  @ApiProperty({
    example: 1,
    description: "Sessionning ID raqami (avtomatik generatsiyalanadi)",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "12", description: "Xodimning ID raqami" })
  @Column()
  staffId: number;

  @ApiProperty({
    example: "login",
    description: "Harakat turi (masalan: login, logout, refresh)",
  })
  @Column({enum: ["login", "lougout"]})
  motion: string;

  @ApiProperty({
    example: "2025-05-31T10:30:00.000Z",
    description: "Harakat sanasi va vaqti",
  })
  @Column()
  date: Date;

  @ApiProperty({
    example: "192.168.1.100",
    description: "Foydalanuvchi tizimga kirgan IP manzil",
  })
  @Column()
  ipAddress: string;

  @ApiProperty({
    example:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    description: "Foydalanuvchi qurilmasi haqida ma'lumot (User-Agent)",
  })
  @Column()
  deviceInfo: string;

  @ManyToOne(()=> Staff, (staff)=> staff.staffSession)
  staff: Staff
}
