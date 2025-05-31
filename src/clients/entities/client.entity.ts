import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Notification } from "../../notifications/entities/notification.entity";

@Entity()
export class Client {
  @ApiProperty({ example: 1, description: "Unikal mijoz ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali Valiyev", description: "To'liq ism sharif" })
  @Column()
  fullName: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @Column()
  phoneNumber: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: "password123", description: "Parol" })
  @Column()
  passwordHash: string;

  @ApiProperty({ example: "uz", description: "Til afzalligi (default: uz)" })
  @Column({ default: "uz" })
  langugaePreference: string;

  @ApiProperty({ example: true, description: "Faol mijoz yoki yo'q" })
  @Column({ default: false })
  isActive: boolean;

  @ApiProperty({
    example: "hashed-refresh-token-string",
    description: "Refresh tokenning xesh ko'rinishi",
  })
  @Column({ default: "" })
  refreshTokenHash: string;

  @ApiProperty({
    example: "hashed-activation-link",
    description: "Activation link",
  })
  @Column()
  activationLink: string;

  @ApiProperty({
    example: "2025-05-30T09:55:00Z",
    description: "Yaratilgan vaqti",
    type: String,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-30T09:57:00Z",
    description: "So‘nggi yangilangan vaqti",
    type: String,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Notification, (notification) => notification.client)
  notifications: Notification[];
}
