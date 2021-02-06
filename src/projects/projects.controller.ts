import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, UnauthorizedException
} from "@nestjs/common";
import { ProjectsService } from './projects.service';
import { NewProjectDto } from './model/dto/new-project.dto';
import { Project } from './model/project.model';
import { UpdatedProjectDto } from './model/dto/updated-project.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/model/role.enum';
import { User } from '../decorators/user.decorator';

enum SupervisedProjects {
  CURRENT = 'current',
  ALL = 'all',
}

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Adding a project.' })
  @ApiResponse({ status: 201, description: 'Project successfully added.' })
  @ApiResponse({ status: 409, description: 'Student already has a project.' })
  async addProject(
    @Body() newProject: NewProjectDto,
    @User() user,
  ): Promise<Project> {
    if (user.id !== newProject.student)
      throw new UnauthorizedException(
        "Can't create a project for a different user",
      );
    return await this.projectsService.addProject(newProject);
  }

  @Get()
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Retrieving a project by the student.' })
  @ApiResponse({ status: 201, description: 'Project successfully retrieved.' })
  @ApiResponse({
    status: 404,
    description: 'Project not found or Student not found.',
  })
  async getStudentCurrentProject(@User() student): Promise<Project> {
    return await this.projectsService.getStudentCurrentProject(student.id);
  }

  @Put()
  @Roles(Role.STUDENT)
  @ApiOperation({
    description: 'Updating a project by the student.',
  })
  @ApiResponse({ status: 201, description: 'Project successfully updated.' })
  @ApiResponse({
    status: 404,
    description: 'Project not found or Student not found.',
  })
  async updateProject(
    @User() student,
    @Body() updates: UpdatedProjectDto,
  ): Promise<Project> {
    return await this.projectsService.updateProject(student.id, updates);
  }

  @Get('professor/:id')
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @ApiOperation({
    description: 'Retrieving projects supervised by a professor',
  })
  @ApiResponse({ status: 201, description: 'Projects successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  @ApiQuery({
    name: 'filter',
    enum: SupervisedProjects,
    description:
      'Filter projects to retrieve: all, old or currently supervised by given professor',
  })
  async getProfessorSupervisedProjects(
    @Param('id') professorId: string,
    @Query('filter') state: string,
  ): Promise<Project[]> {
    if (['current', 'old', 'all'].indexOf(state) > -1)
      return await this.projectsService.getProfessorSupervisedProjects(
        professorId,
        state,
      );
    else throw new BadRequestException('Invalid request');
  }

  @Put('validate/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Validating a project by the admin.' })
  @ApiResponse({ status: 201, description: 'Project successfully validated.' })
  @ApiResponse({
    status: 404,
    description: 'Project not found or not accepted by supervisor yet.',
  })
  async validateProjectByAdmin(@Param('id') projectId: string) {
    await this.projectsService.validateProject(projectId);
  }

  @Put('accept/:id')
  @Roles(Role.PROFESSOR)
  @ApiOperation({ description: 'Validating a project by the supervisor.' })
  @ApiResponse({ status: 201, description: 'Project successfully accepted.' })
  @ApiResponse({ status: 404, description: 'Project not found .' })
  async acceptProjectBySupervisor(@Param('id') projectId: string, @User() professor) {
    await this.projectsService.acceptProject(professor.id, projectId);
  }

  @Delete()
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Deleting a project by the student.' })
  @ApiResponse({ status: 201, description: 'Project successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async deleteProjectByStudent(@User() student) {
    await this.projectsService.deleteProjectByStudent(student.id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Deleting a project by the admin.' })
  @ApiResponse({ status: 201, description: 'Project successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async deleteProjectByAdmin(@Param('id') projectId: string) {
    await this.projectsService.deleteProjectByAdmin(projectId);
  }
}
