import { IsString, MinLength, IsNotEmpty, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordClientDto {
  @ApiProperty({
    example: "OldP@ssw0rd",
    description: "Joriy parol (eski parol)",
  })
  @IsNotEmpty({ message: "Eski parol bo‘sh bo‘lishi mumkin emas" })
  @IsString({ message: "Eski parol matn bo‘lishi kerak" })
  oldPassword: string;

  @ApiProperty({
    example: "NewP@ssw0rd",
    description: "Parol tasdig‘i. Yangi parol bilan bir xil bo‘lishi kerak.",
  })
  @IsNotEmpty({ message: "Parol tasdig‘i bo‘sh bo‘lishi mumkin emas" })
  @IsString({ message: "Parol tasdig‘i matn bo‘lishi kerak" })
  confirmPassword: string;

  @ApiProperty({
    example: "NewP@ssw0rd",
    description: "Yangi parol. Kamida 6 ta belgidan iborat bo‘lishi kerak.",
  })
  @IsNotEmpty({ message: "Yangi parol bo‘sh bo‘lishi mumkin emas" })
  @IsString({ message: "Yangi parol matn bo‘lishi kerak" })
  @MinLength(6, {
    message: "Yangi parol kamida 6 ta belgidan iborat bo‘lishi kerak",
  })
  newPassword: string;
}
