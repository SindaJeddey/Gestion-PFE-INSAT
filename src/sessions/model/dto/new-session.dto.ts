import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class NewSessionDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true })
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true })
  endDate: Date;

  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number, required: true })
  capacity: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  president: string;
}
