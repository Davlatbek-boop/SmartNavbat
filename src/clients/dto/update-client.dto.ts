import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class UpdateClientDto {
  @ApiProperty({ example: "Ali Valiyev", description: "To'liq ism sharif" })
  @IsString()
  fullName?: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsPhoneNumber("UZ")
  phoneNumber?: string;

  @ApiProperty({ example: "ali@example.com", description: "Email manzili" })
  @IsEmail()
  email?: string;
}
