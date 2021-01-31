import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Ranks } from '../ranks.enum';

export class UpdatedProfessorDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  @IsEnum(Ranks)
  rank: string;
}
