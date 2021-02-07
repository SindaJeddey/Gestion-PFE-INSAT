import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatedSessionDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true })
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ type: Date, required: true })
  endDate: Date;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @ApiProperty({ type: Number, required: true })
  capacity: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: true })
  president: string | any;

}
