import { ApiProperty } from "@nestjs/swagger";

export class LoginStaffDto {
  @ApiProperty({example: "davlatbeksalimov81@gmail.com", description: "staff emaili"})
  email: string;

  @ApiProperty({example: "hashed_password_string", description: "foydalanuvchi password"})
  password: string;
}
