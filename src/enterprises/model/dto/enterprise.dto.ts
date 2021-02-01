import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnterpriseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  contact: string;
}
