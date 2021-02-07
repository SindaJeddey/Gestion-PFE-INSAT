import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Departments } from '../departments.enum';
import { Ranks } from '../ranks.enum';
import { ApiProperty } from '@nestjs/swagger';

export class NewProfessorDto {
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
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true , description:"CIN Professeur"})
  cin: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Departments)
  @ApiProperty({ enum: Departments, required: true })
  department: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Ranks)
  @ApiProperty({ enum: Ranks, required: true })
  rank: string;
}
