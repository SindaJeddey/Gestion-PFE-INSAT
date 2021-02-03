import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatedSessionDto{
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true })
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true })
  endDate: Date;

  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number, required: true })
  capacity: number;

  @IsString()
  @ApiProperty({ type: String, required: true })
  president: string;
}
