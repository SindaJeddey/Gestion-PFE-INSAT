import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Departments } from '../departments.enum';
import { Ranks } from '../ranks.enum';

export class NewProfessorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Departments)
  department: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Ranks)
  rank: string;
}
