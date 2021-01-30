import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '../roles.enum';

export class NewUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty()
  role: string;
}
