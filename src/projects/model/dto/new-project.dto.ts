import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnterpriseDto } from '../../../enterprises/model/dto/enterprise.dto';

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
  @ApiProperty({ type: String, required: true, description: 'Supervisor ID' })
  supervisor: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Student ID' })
  student: string;

  @IsOptional()
  @ApiProperty({ type: [String], required: false })
  tags: string[];

  @IsNotEmpty()
  @ApiProperty({ type: EnterpriseDto, required: true })
  enterprise: EnterpriseDto | string;
}
