import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NewProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  academicYear: string;

  @IsEmail()
  @IsNotEmpty()
  supervisor: string;

  @IsEmail()
  @IsNotEmpty()
  student: string;

  @IsOptional()
  tags: string[];
}
