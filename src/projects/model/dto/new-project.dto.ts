import { IS_EMAIL, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
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

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Supervisor email' })
  supervisor: string;

  @IsOptional()
  @ApiProperty({ type: [String], required: false })
  tags: string[];

  @IsNotEmpty()
  @ApiProperty({ type: EnterpriseDto, required: true })
  enterprise: EnterpriseDto | string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true})
  enterpriseSupervisor: string;
}
