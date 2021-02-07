import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatedProjectDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [String], required: false })
  tags: string[];

  session

}
