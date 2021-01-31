import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  description: string;

  @IsString()
  @IsNotEmpty()
  academicYear: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Supervisor ID' })
  supervisor: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Student ID' })
  student: string;

  @IsOptional()
  @ApiProperty({ type: [String], required: false })
  tags: string[];
}
