import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { NewProfessorDto } from './model/dto/new-professor.dto';
import { Professor } from './model/professor.model';
import { ProfessorsService } from './professors.service';
import { UpdatedProfessorDto } from './model/dto/updated-professor.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/model/role.enum';
import { User } from '../decorators/user.decorator';
import { Student } from '../students/model/student.model';
import { Public } from '../decorators/public.decorator';

@ApiTags('Professors')
@Controller('professors')
export class ProfessorsController {
  constructor(private professorsService: ProfessorsService) {}

  @Get('profile')
  @Roles(Role.PROFESSOR)
  // @Public()
  @ApiOperation({ description: 'Retrieving a professor profile.' })
  @ApiResponse({
    status: 200,
    description: 'Professor successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async getStudentProfile(@User() professor): Promise<Professor> {
    return await this.professorsService.getProfessorByEmail(professor.email);
  }

  @Get('/:id')
  // @Roles(Role.ADMIN, Role.STUDENT)
  @Public()
  @ApiOperation({ description: 'Getting a professor.' })
  @ApiResponse({
    status: 200,
    description: 'Professor successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async getProfessor(@Param('id') professorId: string): Promise<Professor> {
    return await this.professorsService.getProfessorById(professorId);
  }

  @Get()
  // @Roles(Role.ADMIN, Role.STUDENT, Role.PROFESSOR)
  @Public()
  @ApiOperation({ description: 'Getting all professors.' })
  @ApiResponse({
    status: 200,
    description: 'Professors successfully retrieved.',
  })
  async getProfessors(): Promise<Professor[]> {
    return await this.professorsService.getAllProfessors();
  }

  @Post()
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Adding professors.' })
  @ApiResponse({ status: 201, description: 'Professors added successfully.' })
  @ApiBody({ type: [NewProfessorDto] })
  async addProfessors(@Body() newProfessors: NewProfessorDto[]) {
    await this.professorsService.addNewProfessors(newProfessors);
  }

  @Put(':id')
  // @Roles(Role.ADMIN, Role.PROFESSOR)
  @Public()
  @ApiOperation({ description: 'Updating a professor.' })
  @ApiResponse({ status: 201, description: 'Professor successfully updated.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async updateProfessor(
    @User() user,
    @Param('id') professorId: string,
    @Body() updates: UpdatedProfessorDto,
  ): Promise<Professor> {
    return await this.professorsService.updateProfessor(professorId, updates);
  }

  @Delete(':id')
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Deleting a professor.' })
  @ApiResponse({ status: 201, description: 'Professor successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async deleteProfessor(@Param('id') professorId: string) {
    await this.professorsService.deleteProfessor(professorId);
  }
}
