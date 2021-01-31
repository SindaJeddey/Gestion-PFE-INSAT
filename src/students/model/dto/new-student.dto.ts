import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Fields } from '../fields.enum';
import { Levels } from '../levels.enum';
import { ApiProperty } from '@nestjs/swagger';

export class NewStudentDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true , description:"Carte d'étudiant"})
  nce: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  lastName: string;

  @IsString()
  @IsEnum(Fields)
  @IsNotEmpty()
  @ApiProperty({ enum: Fields, required: true })
  field: string;

  @IsString()
  @IsEnum(Levels)
  @IsNotEmpty()
  @ApiProperty({ enum: Levels, required: true })
  level: string;
}
