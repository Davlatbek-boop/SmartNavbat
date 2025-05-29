import { IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordAdminDto {
  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Yangi parol. Kamida 6 ta belgidan iborat bo‘lishi kerak.',
  })
  @IsNotEmpty({ message: 'Parol bo‘sh bo‘lishi mumkin emas' })
  @IsString({ message: 'Parol matn bo‘lishi kerak' })
  @MinLength(6, { message: 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak' })
  password: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description: 'Parol tasdig‘i. Yangi parol bilan bir xil bo‘lishi kerak.',
  })
  @IsNotEmpty({ message: 'Parol tasdig‘i bo‘sh bo‘lishi mumkin emas' })
  @IsString({ message: 'Parol tasdig‘i matn bo‘lishi kerak' })
  confirmPassword: string;
}
