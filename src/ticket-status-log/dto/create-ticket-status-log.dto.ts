import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTicketStatusLogDto {
  @ApiProperty({
    example: 1,
    description: "Ticket ID (qaysi chiptaga tegishli)",
  })
  @IsNumber()
  ticket_id: number;

  @ApiProperty({
    example: 3,
    description: "Staff ID (kim tomonidan o‘zgartirildi)",
  })
  @IsNumber()
  staff_id: number;

  @ApiProperty({
    example: "waiting",
    description: "Oldingi status (masalan: waiting)",
  })
  @IsString()
  old_status: string;

  @ApiProperty({
    example: "in_progress",
    description: "Yangi status (masalan: in_progress)",
  })
  @IsString()
  new_status: string;

  @ApiProperty({
    example: "User navbatga kelmadi",
    description: "Qo‘shimcha izohlar",
  })
  @IsString()
  notes: string;
}
