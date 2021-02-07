import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class NewUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  lastName: string;

  @IsString()
  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  role: string;
}
