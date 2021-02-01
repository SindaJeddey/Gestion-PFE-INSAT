import { IsNotEmpty, IsNumber, ValidateIf } from "class-validator";

export class NewAcademicYearDto {
  @IsNumber()
  @IsNotEmpty()
  startYear: number;

  @IsNumber()
  @IsNotEmpty()
  endYear: number;
}
