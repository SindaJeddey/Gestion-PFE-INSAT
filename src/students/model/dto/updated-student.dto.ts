import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Levels } from '../levels.enum';
import { ApiProperty } from "@nestjs/swagger";

export class UpdatedStudentDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: false })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: false })
  lastName: string;

  @IsString()
  @IsEnum(Levels)
  @IsOptional()
  @ApiProperty({ enum: Levels, required: false })
  level: string;
}
