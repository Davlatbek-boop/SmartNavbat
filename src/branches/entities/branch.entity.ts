import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Staff } from "../../staff/entities/staff.entity";

@Entity()
export class Branch {
  @ApiProperty({ example: 1, description: "Filialning unikal ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Yunusobod filial", description: "Filial nomi" })
  @Column()
  name: string;

  @ApiProperty({ example: "YNS01", description: "Filial kodi" })
  @Column()
  code: string;

  @ApiProperty({
    example: "Toshkent, Yunusobod 10",
    description: "Filial manzili",
  })
  @Column()
  address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Filial telefon raqami",
  })
  @Column()
  phoneNumber: string;

  @ApiProperty({
    example: "branch@example.com",
    description: "Filial email manzili",
  })
  @Column()
  email: string;

  @ApiProperty({
    example: "41.311081",
    description: "Filialning latitude koordinatasi",
  })
  @Column({default: ""})
  lantitude: string;

  @ApiProperty({
    example: "69.279563",
    description: "Filialning longitude koordinatasi",
  })
  @Column({default: ""})
  longitude: string;

  @ApiProperty({ example: "09:00 - 18:00", description: "Filial ish vaqti" })
  @Column()
  workingHours: string;

  @ApiProperty({ example: "true", description: "Filial faolmi yoki yo‘q" })
  @Column({default: true})
  isActive: boolean;

  @ApiProperty({
    example: "2025-05-31T08:15:22.000Z",
    description: "Yaratilgan sana",
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-31T09:00:00.000Z",
    description: "Oxirgi yangilangan sana",
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(()=> Staff, (staffs)=> staffs.branch)
  staffs: Staff
}
