import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Branch } from "../../branches/entities/branch.entity";

@Entity()
export class Counter {
  @ApiProperty({
    example: 1,
    description: "Unikal counter ID raqami",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: "branchning id si",
  })
  @Column()
  branchId: number;

  @ApiProperty({
    example: "C-001",
    description: "Counter raqami (masalan: C-001)",
  })
  @Column()
  counterNumber: string;

  @ApiProperty({
    example: "1-qavatdagi kutish zali counteri",
    description: "Counterning qisqacha tavsifi",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: "1,2,3",
    description:
      "Qo‘llab-quvvatlanadigan xizmatlar ID ro‘yxati (vergul bilan ajratilgan string)",
  })
  @Column()
  supportedServices: string;

  @ApiProperty({
    example: true,
    description: "Counter faol yoki yo‘qligini bildiradi",
  })
  @Column({ default: true })
  isActive: string;

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Counter yaratilingan vaqt",
  })
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty({
    example: "2025-06-05T15:30:00.000Z",
    description: "Counter oxirgi marta yangilangan vaqt",
  })
  @UpdateDateColumn()
  updateAt: Date;

  @ApiProperty({
    description: "Counter tegishli bo‘lgan filial (branch)",
    type: () => Branch,
  })
  @ManyToOne(() => Branch, (branch) => branch.counter)
  branch: Branch;
}
