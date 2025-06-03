import { ApiProperty } from "@nestjs/swagger";

export class LoginAdminDto {

  @ApiProperty({example: "ali@exaasjmple.com", description: "adminning emaili"})
  email: string;

  @ApiProperty({example: "StrongP@ssw0rd", description: "adminning paroli"})
  password: string;
}
