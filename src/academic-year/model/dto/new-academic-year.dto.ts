import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewAcademicYearDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  startYear: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  endYear: number;
}
