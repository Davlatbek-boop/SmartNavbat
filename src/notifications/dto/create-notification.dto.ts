import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn, IsDateString, IsNumber } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    example: 101,
    description: 'Mijoz ID raqami (clientId)',
  })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({
    example: 'Sizga yangi xabar bor!',
    description: 'Yuborilgan xabar matni',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: 'email',
    description: 'Xabar yuborish kanali (email, sms, telegram)',
  })
  @IsString()
  @IsIn(['email', 'sms', 'telegram']) // faqat ruxsat berilgan kanallar
  via: string;

  @ApiProperty({
    example: 'sent',
    description: 'Xabar holati (sent, failed, pending)',
  })
  @IsString()
  @IsIn(['sent', 'failed', 'pending']) // faqat ushbu holatlar
  status: string;

  @ApiProperty({
    example: '2025-05-30T10:00:00Z',
    description: 'Xabar qachon yuborilgan (ISO formatda)',
  })
  @IsDateString()
  sentAt: Date;
}
