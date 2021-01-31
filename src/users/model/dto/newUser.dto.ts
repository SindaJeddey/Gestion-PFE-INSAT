import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from '../roles';
import { ApiProperty } from '@nestjs/swagger';

export class NewUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  email: string;

  @IsString()
  @IsEnum(Roles)
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  role: string;
}
