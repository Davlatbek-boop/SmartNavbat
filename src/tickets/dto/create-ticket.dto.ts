import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsDateString,
  IsString,
  Min,
  Max,
} from "class-validator";

export enum TicketStatus {
  PENDING = "pending",
  CALLED = "called",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export class CreateTicketDto {
  @ApiProperty({ example: 14, description: "Mijoz ID raqami" })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ example: 3, description: "Xizmat ID raqami" })
  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @ApiProperty({ example: 3, description: "Filial ID raqami" })
  @IsNumber()
  @IsNotEmpty()
  branchId: number;

  @ApiProperty({
    example: 2,
    description: "Ustuvorlik darajasi (1 - past, 2 - o‘rta, 3 - yuqori)",
  })
  @IsNumber()
  @Min(1)
  @Max(3)
  priorityLevel: number;
}
