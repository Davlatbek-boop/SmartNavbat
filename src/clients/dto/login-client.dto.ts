import { ApiProperty } from "@nestjs/swagger";

export class LoginClientDto {
  @ApiProperty({example: "ismonaliyevbaxtibek571@gmail.com", description: "foydalanuvchi emaili"})
  email: string;

  @ApiProperty({example: "password123", description: "foydalanuvchi password"})
  password: string;
}
