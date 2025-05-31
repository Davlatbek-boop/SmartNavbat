import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
} from "class-validator";

export class CreateBranchDto {
  @ApiProperty({ example: "Yunusobod filial", description: "Filial nomi" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "YNS01", description: "Filial kodi" })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: "Toshkent, Yunusobod 10",
    description: "Filial manzili",
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Filial telefon raqami",
  })
  @IsNotEmpty()
  @IsPhoneNumber("UZ")
  phoneNumber: string;

  @ApiProperty({
    example: "branch@example.com",
    description: "Filial email manzili",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "09:00 - 18:00", description: "Filial ish vaqti" })
  @IsNotEmpty()
  @IsString()
  workingHours: string;
}
