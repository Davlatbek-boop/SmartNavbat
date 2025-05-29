import { Field, InputType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  Matches,
} from 'class-validator';

@InputType()
export class UpdateAdminDto {
  @Field({ nullable: true })
  @ApiPropertyOptional({ example: 'Ali Valiyev' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: 'ali_admin' })
  @IsOptional()
  @IsString()
  username?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: 'ali@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @Matches(/^\+998\d{9}$/, {
    message: 'phoneNumber must be a valid Uzbek phone number (+998...)',
  })
  phoneNumber?: string;
}
