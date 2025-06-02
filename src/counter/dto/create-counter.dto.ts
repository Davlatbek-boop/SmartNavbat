import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCounterDto {
  @ApiProperty({ example: "C-001", description: "Counter raqami" })
  @IsString()
  counterNumber: string;

  @ApiProperty({
    example: "1-qavatdagi kutish zali counteri",
    description: "Tavsif",
  })
  @IsString()
  description: string;

  @ApiProperty({ example: "1,2,3", description: "Xizmat ID ro‘yxati" })
  @IsString()
  supportedServices: string;

  
  @ApiProperty({ example: 1, description: "branchning Id si" })
  @IsString()
  branchId: number;
}
