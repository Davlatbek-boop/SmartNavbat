import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsPhoneNumber, IsInt } from "class-validator";

export class CreateStaffDto {
  @ApiProperty({ example: "Ali Valiyev", description: "To‘liq ism" })
  @IsString()
  fullName: string;

  @ApiProperty({ example: "ali.valiyev", description: "Foydalanuvchi nomi" })
  @IsString()
  username: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "hashed_password_string",
    description: "Parol hash ko‘rinishida",
  })
  @IsString()
  password: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsPhoneNumber("UZ") 
  phoneNumber: string;

  @ApiProperty({ example: 2, description: "Rol ID raqami" })
  @IsInt()
  roleId: number;

  @ApiProperty({ example: 3, description: "Filial ID raqami" })
  @IsInt()
  branchId: number;
}
