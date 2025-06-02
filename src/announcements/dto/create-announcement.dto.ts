import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAnnouncementDto {
  @ApiProperty({
    example: 5,
    description: "Eʼlonni joylashtirgan xodim ID raqami",
  })
  @IsInt()
  staffId: number;

  @ApiProperty({
    example: 2,
    description: "Eʼlon tegishli bo‘lgan filial (branch) ID raqami",
  })
  @IsInt()
  branchId: number;

  @ApiProperty({
    example: "Ish grafigi o‘zgardi",
    description: "Eʼlon sarlavhasi",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "Yangi ish jadvali 1-iyundan kuchga kiradi.",
    description: "Eʼlon matni",
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: 3,
    description: "Ustuvorlik darajasi (1 - past, 2 - o‘rta, 3 - yuqori)",
  })
  @IsInt()
  priorityLevel: number;

  @ApiProperty({
    example: "2025-06-01T08:00:00.000Z",
    description: "Eʼlon kuchga kiradigan sana",
  })
  @IsDateString()
  validFrom: Date;

  @ApiProperty({
    example: "2025-06-10T17:00:00.000Z",
    description: "Eʼlon amal qilish muddati tugaydigan sana",
  })
  @IsDateString()
  validTo: Date;
}
