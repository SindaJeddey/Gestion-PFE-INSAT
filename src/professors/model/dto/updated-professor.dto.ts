import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Ranks } from '../ranks.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatedProfessorDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, required: true })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: true })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: true })
  lastName: string;

  @IsString()
  @IsOptional()
  @IsEnum(Ranks)
  @ApiProperty({ enum: Ranks, required: true })
  rank: string;
}
