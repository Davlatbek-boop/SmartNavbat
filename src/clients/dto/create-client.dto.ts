import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  Length,
} from "class-validator";

export class CreateClientDto {
  @ApiProperty({ example: "Ali Valiyev", description: "To'liq ism sharif" })
  @IsString()
  fullName: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsPhoneNumber("UZ") 
  phoneNumber: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123", description: "Parol" })
  @IsString()
  @Length(6, 20, {
    message: "Parol 6 dan 20 gacha belgidan iborat bo'lishi kerak",
  })
  password: string;
}
