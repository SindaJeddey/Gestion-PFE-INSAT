import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NewProfessorDto } from './model/dto/new-professor.dto';
import { Professor } from './model/professor.model';
import { ProfessorsService } from './professors.service';
import { UpdatedProfessorDto } from './model/dto/updated-professor.dto';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Professors')
@Controller('professors')
export class ProfessorsController {
  constructor(private professorsService: ProfessorsService) {}

  @Post()
  @ApiOperation({ description: 'Adding a new professor.' })
  @ApiResponse({ status: 201, description: 'Professor added successfully.' })
  @ApiResponse({ status: 500, description: 'Server side issues.' })
  async addProfessor(
    @Body() newProfessor: NewProfessorDto,
  ): Promise<Professor> {
    return await this.professorsService.addNewProfessor(newProfessor);
  }

  @Get('/:id')
  @ApiOperation({ description: 'Getting a professor.' })
  @ApiResponse({ status: 201, description: 'Professor successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async getProfessor(@Param('id') id: string): Promise<Professor> {
    return await this.professorsService.getProfessor(id);
  }

  @Get()
  @ApiOperation({ description: 'Getting all professors.' })
  @ApiResponse({ status: 201, description: 'Professors successfully retrieved.' })
  async getProfessors(): Promise<Professor[]> {
    return await this.professorsService.getAllProfessors();
  }

  @Put(':id')
  @ApiOperation({ description: 'Updating a professor.' })
  @ApiResponse({ status: 201, description: 'Professor successfully updated.' })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async updateProfessor(
    @Param('id') id: string,
    @Body() updates: UpdatedProfessorDto,
  ): Promise<Professor> {
    return await this.professorsService.updateProfessor(id, updates);
  }
}
