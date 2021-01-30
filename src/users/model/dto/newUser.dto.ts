import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from '../roles';

export class NewUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Roles)
  @IsNotEmpty()
  role: string;
}
