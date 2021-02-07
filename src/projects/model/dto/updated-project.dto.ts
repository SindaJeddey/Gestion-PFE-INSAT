import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Session } from "../../../sessions/model/session.model";
import { State } from "../state.enum";

export class  UpdatedProjectDto {
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

  @IsOptional()
  @ApiProperty({ required: false })
  session: Session;

  @IsOptional()
  @IsEnum(State)
  @ApiProperty({ type: String, enum: State, required: false })
  state: string;
}
