import { Body, Controller, Get, Post } from "@nestjs/common";
import { AcademicYearService } from "./academic-year.service";
import { AcademicYear } from "./model/academic-year.model";
import { NewAcademicYearDto } from "./model/dto/new-academic-year.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/model/role.enum";

@Controller('academic-year')
@ApiBearerAuth()
@ApiTags('Academic Year')
export class AcademicYearController {
  constructor(private academicYearService: AcademicYearService) {}

  @Get()
  @Roles(Role.ADMIN, Role.STUDENT, Role.PROFESSOR)
  @ApiOperation({ description: 'Get current academic year' })
  @ApiResponse({ status: 200, description: 'Current academic year fetched.' })
  @ApiResponse({ status: 404, description: 'There is no academic year currently happening.'})
  async getCurrent(): Promise<AcademicYear> {
    return await this.academicYearService.getCurrentAcademicYear();
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Create a new academic year' })
  @ApiResponse({ status: 201, description: 'New academic year successfully created.' })
  async newYear(@Body() newYear: NewAcademicYearDto): Promise<AcademicYear> {
    return await this.academicYearService.createNewAcademicYear(newYear);
  }
}
