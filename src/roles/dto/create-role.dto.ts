import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'operator',
    description: 'Rol nomi (masalan: operator, user, doctor)',
  })
  name: string;

  @ApiProperty({
    example: 'Barcha qo\'ng\'iroqlarga javob beruvchi',
    description: 'Rol uchun tavsif',
  })
  description: string;
}
