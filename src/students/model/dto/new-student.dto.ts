import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Fields } from '../fields.enum';
import { Levels } from '../levels.enum';

export class NewStudentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  nce: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEnum(Fields)
  @IsNotEmpty()
  field: string;

  @IsString()
  @IsEnum(Levels)
  @IsNotEmpty()
  level: string;
}
