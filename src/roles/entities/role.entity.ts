import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Staff } from "../../staff/entities/staff.entity";

@Entity()
export class Role {
  @ApiProperty({
    example: 1,
    description: "Rolning noyob identifikatori",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "doctor",
    description: "Rol nomi (masalan: reseption, bugalter, doctor, operator)",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: "Odamlarni davolash",
    description: "Rol uchun tavsif",
  })
  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @OneToMany(()=> Staff, (staffs)=> staffs.role)
  staffs: Staff[]
}
