import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Staff } from "../../staff/entities/staff.entity";
import { Branch } from "../../branches/entities/branch.entity";

@Entity()
export class Announcement {
  @ApiProperty({
    example: 1,
    description: "Eʼlonning unikal ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 5,
    description: "Eʼlonni joylashtirgan xodim ID raqami",
  })
  @Column()
  staffId: number;

  @ApiProperty({
    example: 2,
    description: "Eʼlon tegishli bo‘lgan filial (branch) ID raqami",
  })
  @Column()
  branchId: number;

  @ApiProperty({
    example: "Ish grafigi o‘zgardi",
    description: "Eʼlon sarlavhasi",
  })
  @Column()
  title: string;

  @ApiProperty({
    example: "Yangi ish jadvali 1-iyundan kuchga kiradi.",
    description: "Eʼlon matni",
  })
  @Column()
  message: string;

  @ApiProperty({
    example: 3,
    description: "Ustuvorlik darajasi (1 - past, 2 - o‘rta, 3 - yuqori)",
  })
  @Column()
  priorityLevel: number;

  @ApiProperty({
    example: "2025-06-01T08:00:00.000Z",
    description: "Eʼlon kuchga kiradigan sana",
  })
  @Column()
  validFrom: Date;

  @ApiProperty({
    example: "2025-06-10T17:00:00.000Z",
    description: "Eʼlon amal qilish muddati tugaydigan sana",
  })
  @Column()
  validTo: Date;

  @ManyToOne(() => Staff, (staff) => staff.announcement)
  staff: Staff;

  @ManyToOne(() => Branch, (branch) => branch.announcement)
  branch: Branch;
}
