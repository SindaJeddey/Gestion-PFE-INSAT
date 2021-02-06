import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from "@nestjs/common";
import { NewProfessorDto } from "./model/dto/new-professor.dto";
import { Professor } from "./model/professor.model";
import { ProfessorsService } from "./professors.service";
import { UpdatedProfessorDto } from "./model/dto/updated-professor.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/model/role.enum";
import { User } from "../decorators/user.decorator";

@ApiTags('Professors')
@Controller('professors')
export class ProfessorsController {
  constructor(private professorsService: ProfessorsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Adding a new professor.' })
  @ApiResponse({ status: 201, description: 'Professor added successfully.' })
  @ApiResponse({ status: 500, description: 'Server side issues.' })
  async addProfessor(
    @Body() newProfessor: NewProfessorDto,
  ): Promise<Professor> {
    return await this.professorsService.addNewProfessor(newProfessor);
  }

  @Get('/:id')
  @Roles(Role.ADMIN, Role.STUDENT, Role.PROFESSOR)
  @ApiOperation({ description: 'Getting a professor.' })
  @ApiResponse({ status: 201, description: 'Professor successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async getProfessor(@Param('id') professorId: string): Promise<Professor> {
    return await this.professorsService.getProfessor(professorId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STUDENT, Role.PROFESSOR)
  @ApiOperation({ description: 'Getting all professors.' })
  @ApiResponse({ status: 201, description: 'Professors successfully retrieved.' })
  async getProfessors(): Promise<Professor[]> {
    return await this.professorsService.getAllProfessors();
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @ApiOperation({ description: 'Updating a professor.' })
  @ApiResponse({ status: 201, description: 'Professor successfully updated.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async updateProfessor(
    @User() user,
    @Param('id') professorId: string,
    @Body() updates: UpdatedProfessorDto,
  ): Promise<Professor> {
    if (user.role === Role.PROFESSOR && user.id != professorId)
      throw new UnauthorizedException(`Can't update professor id ${professorId}`)
    return await this.professorsService.updateProfessor(professorId, updates);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Deleting a professor.' })
  @ApiResponse({ status: 201, description: 'Professor successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async deleteProfessor(@Param('id') professorId: string) {
    await this.professorsService.deleteProfessor(professorId);
  }
}
