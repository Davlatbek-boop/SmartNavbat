import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    example: 1,
    description: "Filial ID raqami",
  })
  branchId: number;

  @ApiProperty({
    example: 1,
    description: "Xodim ID raqami",
  })
  staffId: number;

  @ApiProperty({
    example: "SERV001",
    description: "Xizmat kodi",
  })
  code: string;

  @ApiProperty({
    example: "Umumiy maslahat xizmati",
    description: "Xizmat haqida tavsif",
  })
  description: string;

  @ApiProperty({
    example: 15,
    description: "Oʻrtacha xizmat ko‘rsatish vaqti (minutlarda)",
  })
  avarageServiceTime: number;

  @ApiProperty({
    example: 50,
    description: "Bir kunlik maksimal xizmat ko‘rsatish soni",
  })
  maxDailyCapacity: number;

  @ApiProperty({
    example: 2,
    description: "Ustuvorlik darajasi (1 - past, 2 - o‘rta, 3 - yuqori)",
  })
  priorityLevel: number;
}
