import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsIn,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class UpdateNotificationDto {
  @ApiPropertyOptional({
    example: 101,
    description: 'Mijoz ID raqami (clientId)',
  })
  @IsOptional()
  @IsNumber()
  clientId?: number;

  @ApiPropertyOptional({
    example: 'Yangi xabar tarkibi',
    description: 'Yuborilgan xabar matni',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    example: 'sms',
    description: 'Xabar yuborish kanali (email, sms, telegram)',
  })
  @IsOptional()
  @IsString()
  @IsIn(['email', 'sms', 'telegram'])
  via?: string;

  @ApiPropertyOptional({
    example: 'pending',
    description: 'Xabar holati (sent, failed, pending)',
  })
  @IsOptional()
  @IsString()
  @IsIn(['sent', 'failed', 'pending'])
  status?: string;

  @ApiPropertyOptional({
    example: '2025-05-30T12:00:00Z',
    description: 'Yuborilgan vaqt (ISO formatda)',
  })
  @IsOptional()
  @IsDateString()
  sentAt?: Date;
}
