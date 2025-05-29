import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from "class-validator";

@InputType()
export class CreateAdminDto {
  @Field()
  @ApiProperty({ example: "Ali Valiyev" })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field()
  @ApiProperty({ example: "ali_admin" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @ApiProperty({ example: "ali@example.com" })
  @IsEmail()
  email: string;

  @Field()
  @ApiProperty({ example: "StrongP@ssw0rd", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @ApiProperty({ example: "+998901234567" })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: "phoneNumber must be a valid Uzbek phone number (+998...)",
  })
  phoneNumber: string;
}
