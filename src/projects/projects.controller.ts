import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProjectsService } from './projects.service';
import { NewProjectDto } from './model/dto/new-project.dto';
import { Project } from './model/project.model';
import { UpdatedProjectDto } from './model/dto/updated-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  //by student
  @Post()
  @ApiOperation({ description: 'Adding a project.' })
  @ApiResponse({ status: 201, description: 'Project successfully added.' })
  @ApiResponse({ status: 409, description: 'Student already has a project.' })
  async addProject(@Body() newProject: NewProjectDto): Promise<Project> {
    return await this.projectsService.addProject(newProject);
  }

  //by student
  @Get()
  @ApiOperation({ description: 'Retrieving a project by the student.' })
  @ApiResponse({ status: 201, description: 'Project successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Project not found or Student not found.' })
  async getStudentProject(@Body('id') id: string): Promise<Project> {
    return await this.projectsService.getStudentProject(id);
  }

  //by student
  //body student will be replaced later with the id in the token
  @Put()
  @ApiOperation({ description: 'Updating a project by the student. Student Id will be passed in the token' })
  @ApiResponse({ status: 201, description: 'Project successfully updated.' })
  @ApiResponse({ status: 404, description: 'Project not found or Student not found.' })
  async updateProject(
    @Body('student') id: string,
    @Body('updates') updates: UpdatedProjectDto,
  ): Promise<Project> {
    return await this.projectsService.updateProject(id, updates);
  }

  //by admin
  @Put('validate/:id')
  @ApiOperation({ description: 'Validating a project by the admin.' })
  @ApiResponse({ status: 201, description: 'Project successfully validated.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async validateProject(@Param('id') id: string) {
    await this.projectsService.validateProject(id);
  }

  //by student
  @Delete()
  @ApiOperation({ description: 'Deleting a project by the student.' })
  @ApiResponse({ status: 201, description: 'Project successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async deleteProjectByStudent(@Body('student') id: string) {
    await this.projectsService.deleteProjectByStudent(id);
  }

  //by admin
  @Delete(':id')
  @ApiOperation({ description: 'Deleting a project by the admin.' })
  @ApiResponse({ status: 201, description: 'Project successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  async deleteProjectByAdmin(@Param('id') projectId: string) {
    await this.projectsService.deleteProjectByAdmin(projectId);
  }
}
