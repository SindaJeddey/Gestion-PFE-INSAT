import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { NewProjectDto } from "./model/dto/new-project.dto";
import { Project } from "./model/project.model";
import { UpdatedProjectDto } from "./model/dto/updated-project.dto";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/model/role.enum";
import { User } from "../decorators/user.decorator";
import { Public } from "../decorators/public.decorator";

enum SupervisedProjects {
  CURRENT = 'current',
  ALL = 'all',
}

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get('professor')
  @Roles(Role.PROFESSOR)
  @ApiOperation({
    description: 'Retrieving projects supervised by a professor',
  })
  @ApiResponse({ status: 200, description: 'Projects successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  @ApiQuery({
    name: 'filter',
    enum: SupervisedProjects,
    description:
      'Filter projects to retrieve: all, old or currently supervised by given professor',
  })
  async getProfessorSupervisedProjects(
    @User() professor,
    @Query('filter') state: string,
  ): Promise<Project[]> {
    if (['current', 'old', 'all'].indexOf(state) > -1)
      return await this.projectsService.getProfessorSupervisedProjects(
        professor.email,
        state,
      );
    else throw new BadRequestException('Invalid request');
  }

  @Get('to-accept')
  @Roles(Role.PROFESSOR)
  @ApiOperation({
    description: 'Retrieving projects to be accepted by supervisor',
  })
  @ApiResponse({ status: 200, description: 'Projects successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async getProjectsToBeAccepted(@User() professor): Promise<Project[]> {
    return await this.projectsService.getProjectsToBeAcceptedByProfessor(
      professor.email,
    );
  }

  @Get('to-validate')
  @Roles(Role.ADMIN)
  @ApiOperation({
    description: 'Retrieving projects to be validated by admin',
  })
  @ApiResponse({ status: 200, description: 'Projects successfully retrieved.' })
  async getProjectsToBeValidated(): Promise<Project[]> {
    return await this.projectsService.getProjectsToBeValidatedByAdmin();
  }

  @Get('session/:id')
  @ApiOperation({
    description: 'Retrieving projects of a given session',
  })
  @Roles(Role.ADMIN)
  async getProjectsPerSession(
    @Param('id') sessionId: string,
  ): Promise<Project[]> {
    return await this.projectsService.getProjectsPerSession(sessionId);
  }

  @Get()
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Retrieving a project by the student.' })
  @ApiResponse({ status: 200, description: 'Project successfully retrieved.' })
  @ApiResponse({
    status: 404,
    description: 'Project not found or Student not found.',
  })
  async getStudentCurrentProject(@User() student): Promise<Project> {
    return await this.projectsService.getStudentCurrentProject(student.email);
  }

  @Post()
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Adding a project.' })
  @ApiResponse({ status: 201, description: 'Project successfully added.' })
  @ApiResponse({ status: 409, description: 'Student already has a project.' })
  async addProject(@Body() newProject: NewProjectDto, @User() student): Promise<Project> {
    return await this.projectsService.addProject(newProject, student.email);
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
  async acceptProjectBySupervisor(
    @Param('id') projectId: string,
    @User() professor,
  ) {
    await this.projectsService.acceptProject(professor.email, projectId);
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
    return await this.projectsService.updateProject(student.email, updates);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Deleting a project by the admin.' })
  @ApiResponse({ status: 204, description: 'Project successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async deleteProjectByAdmin(@Param('id') projectId: string) {
    await this.projectsService.deleteProjectByAdmin(projectId);
  }

  @Delete()
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Deleting a project by the student.' })
  @ApiResponse({ status: 204, description: 'Project successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async deleteProjectByStudent(@User() student) {
    await this.projectsService.deleteProjectByStudent(student.email);
  }
}
