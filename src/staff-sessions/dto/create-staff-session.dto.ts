import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffSessionDto {
  @ApiProperty({ example: "12", description: "Xodimning ID raqami" })
  staffId: number;

  @ApiProperty({
    example: "login",
    description: "Harakat turi (masalan: login, logout, refresh)",
  })
  motion: string;

  @ApiProperty({
    example: "2025-05-31T10:30:00.000Z",
    description: "Harakat sanasi va vaqti",
  })
  date: Date;

  @ApiProperty({
    example: "192.168.1.100",
    description: "Foydalanuvchi tizimga kirgan IP manzil",
  })
  ipAddress: string;

  @ApiProperty({
    example:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    description: "Foydalanuvchi qurilmasi haqida ma'lumot (User-Agent)",
  })
  deviceInfo: string;
}
