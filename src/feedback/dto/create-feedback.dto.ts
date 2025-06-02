import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min, Max, IsString } from "class-validator";

export class CreateFeedbackDto {
  @ApiProperty({ example: 1, description: "Mijoz ID raqami" })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  client_id: number;

  @ApiProperty({ example: 10, description: "Ticket ID raqami" })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  ticket_id: number;

  @ApiProperty({ example: 3, description: "Xodim (staff) ID raqami" })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  staff_id: number;

  @ApiProperty({
    example: 4,
    description: "Xizmat sifati bo‘yicha reyting (1-5)",
  })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  raiting: number;

  @ApiProperty({
    example: "Xizmatdan juda mamnunman",
    description: "Foydalanuvchi fikri",
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
