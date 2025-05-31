import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateStaffDto } from "./create-staff.dto";
import { IsEmail, IsInt, IsPhoneNumber, IsString } from "class-validator";

export class UpdateStaffDto {
  @ApiProperty({ example: "Ali Valiyev", description: "To‘liq ism" })
  @IsString()
  fullName?: string;

  @ApiProperty({ example: "ali.valiyev", description: "Foydalanuvchi nomi" })
  @IsString()
  username?: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsPhoneNumber("UZ")
  phoneNumber?: string;

  @ApiProperty({ example: 2, description: "Rol ID raqami" })
  @IsInt()
  roleId?: number;

  @ApiProperty({ example: 3, description: "Filial ID raqami" })
  @IsInt()
  branchId?: number;
}
