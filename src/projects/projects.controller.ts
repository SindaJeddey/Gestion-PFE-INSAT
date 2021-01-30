import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { ProjectsService } from './projects.service';
import { NewProjectDto } from './model/dto/new-project.dto';
import { Project } from './model/project.model';
import { UpdatedProjectDto } from "./model/dto/updated-project.dto";

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async addProject(@Body() newProject: NewProjectDto): Promise<Project> {
    return await this.projectsService.addProject(newProject);
  }

  @Get()
  async getStudentProject(@Body('email') email: string): Promise<Project>{
    return await this.projectsService.getStudentProject(email);
  }

  @Put()
  async updateProject(
    @Body('email') email: string,
    @Body('updates') updates: UpdatedProjectDto,
  ): Promise<Project> {
    return await this.projectsService.updateProject(email, updates);
  }
}
