import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceScheduleDto {
  @ApiProperty({
    example: 3,
    description: "Xizmat ID raqami",
  })
  serviceId: number;

  @ApiProperty({
    example: "Monday",
    description: "Haftaning kuni (Ingliz tilida: Monday, Tuesday, ...)",
  })
  dayOfWeek: string;

  @ApiProperty({
    example: "2025-06-01T09:00:00.000Z",
    description: "Xizmat boshlanish vaqti (ISO formatda)",
  })
  startTime: Date;

  @ApiProperty({
    example: "2025-06-01T18:00:00.000Z",
    description: "Xizmat tugash vaqti (ISO formatda)",
  })
  endTime: Date;

  @ApiProperty({
    example: "2025-06-01T13:00:00.000Z",
    description: "Tushlik boshlanish vaqti (ISO formatda)",
  })
  breakStart: Date;

  @ApiProperty({
    example: "2025-06-01T14:00:00.000Z",
    description: "Tushlik tugash vaqti (ISO formatda)",
  })
  breakEnd: Date;
}
