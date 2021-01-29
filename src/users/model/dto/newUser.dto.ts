import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '../roles.enum';

export class NewUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty()
  role: string;
}
