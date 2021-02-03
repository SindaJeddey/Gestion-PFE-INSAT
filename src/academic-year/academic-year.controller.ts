import { Body, Controller, Get, Post } from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { AcademicYear } from './model/academic-year.model';
import { NewAcademicYearDto } from './model/dto/new-academic-year.dto';
import { ApiTags } from "@nestjs/swagger";

@Controller('academic-year')
@ApiTags('Academic Year')
export class AcademicYearController {
  constructor(private academicYearService: AcademicYearService) {}

  @Get()
  async getCurrent(): Promise<AcademicYear> {
    return await this.academicYearService.getCurrentAcademicYear();
  }

  @Post()
  async newYear(@Body() newYear: NewAcademicYearDto): Promise<AcademicYear> {
    return await this.academicYearService.createNewAcademicYear(newYear);
  }
}
