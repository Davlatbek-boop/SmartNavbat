import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({ example: 1 })
  id: number;

  @Field()
  @Column()
  @ApiProperty({ example: "Ali Valiyev" })
  fullName: string;

  @Field()
  @Column()
  @ApiProperty({ example: "ali_admin" })
  username: string;

  @Field()
  @Column({ unique: true })
  @ApiProperty({ example: "ali@example.com", uniqueItems: true })
  email: string;

  @Field()
  @Column()
  @ApiProperty({ example: "$2b$10$..." })
  passwordHash: string;

  @Field()
  @Column()
  @ApiProperty({ example: "+998901234567" })
  phoneNumber: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  @ApiProperty({ example: true, default: true })
  isActive: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  @ApiProperty({ example: false, default: false })
  isCreator: boolean;

  @Field({defaultValue: ""})
  @Column({default: ""})
  @ApiProperty({ example: "refresh_token_hash_here" })
  refreshTokenHash: string;

  @ApiProperty({
    example: '2025-05-30T09:55:00Z',
    description: 'Yaratilgan vaqti',
    type: String,
  })
  @Field()
  @CreateDateColumn()
  createdAt: Date;

   @ApiProperty({
    example: '2025-05-30T09:57:00Z',
    description: 'So‘nggi yangilangan vaqti',
    type: String,
  })
  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
