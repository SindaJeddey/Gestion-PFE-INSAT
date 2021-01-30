import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatedProjectDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  tags: string[];
}
