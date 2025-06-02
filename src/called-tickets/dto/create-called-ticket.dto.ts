import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateCalledTicketDto {
  @ApiProperty({
    example: 101,
    description: "Chaqirilgan ticketning ID raqami",
  })
  @IsInt({ message: "ticketId butun son bo‘lishi kerak" })
  @Min(1, { message: "ticketId 1 dan katta bo‘lishi kerak" })
  @IsNotEmpty({ message: "ticketId bo‘sh bo‘lmasligi kerak" })
  ticketId: number;

  @ApiProperty({ example: 5, description: "Xodim (staff) ID raqami" })
  @IsInt({ message: "staffId butun son bo‘lishi kerak" })
  @Min(1, { message: "staffId 1 dan katta bo‘lishi kerak" })
  @IsNotEmpty({ message: "staffId bo‘sh bo‘lmasligi kerak" })
  staffId: number;

  @ApiProperty({ example: 3, description: "Counter (kassa) ID raqami" })
  @IsInt({ message: "counterId butun son bo‘lishi kerak" })
  @Min(1, { message: "counterId 1 dan katta bo‘lishi kerak" })
  @IsNotEmpty({ message: "counterId bo‘sh bo‘lmasligi kerak" })
  counterId: number;
}
