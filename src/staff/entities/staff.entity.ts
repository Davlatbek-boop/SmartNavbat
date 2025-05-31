import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Branch } from "../../branches/entities/branch.entity";
import { StaffSession } from "../../staff-sessions/entities/staff-session.entity";

@Entity()
export class Staff {
  @ApiProperty({ example: 1, description: "Xodim ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali Valiyev", description: "To‘liq ism" })
  @Column()
  fullName: string;

  @ApiProperty({ example: "ali.valiyev", description: "Foydalanuvchi nomi" })
  @Column()
  username: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @Column()
  email: string;

  @ApiProperty({
    example: "hashed_password_string",
    description: "Parol hash ko‘rinishida",
  })
  @Column()
  passwordHash: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @Column()
  phoneNumber: string;

  @ApiProperty({ example: 2, description: "Rol ID raqami" })
  @Column()
  roleId: number;

  @ApiProperty({ example: 3, description: "Filial ID raqami" })
  @Column()
  branchId: number;

  @ApiProperty({ example: true, description: "Xodim faolmi yoki yo‘qmi" })
  @Column({default: true})
  isActive: boolean;

  @ApiProperty({
    example: "2025-05-31T10:30:00.000Z",
    description: "Oxirgi login sanasi",
  })
  @Column({default: "2025-05-31T10:30:00.000Z"})
  lastLogin: Date;

  @ApiProperty({
    example: "hashed_refresh_token_string",
    description: "Refresh token hash",
  })
  @Column({default: ""})
  refreshTokenHash: string;

  @ApiProperty({
    example: "2025-05-30T10:00:00.000Z",
    description: "Yaratilgan vaqt",
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-31T09:00:00.000Z",
    description: "Yangilangan vaqt",
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(()=> Role, (role)=>role.staffs)
  role: Role

  @ManyToOne(()=> Branch, (branch)=> branch.staffs)
  branch: Branch

  @OneToMany(()=> StaffSession, (staffSession)=> staffSession.staff)
  staffSession: StaffSession[]
}