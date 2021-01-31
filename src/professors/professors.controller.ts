import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NewProfessorDto } from './model/dto/new-professor.dto';
import { Professor } from './model/professor.model';
import { ProfessorsService } from './professors.service';
import { UpdatedProfessorDto } from './model/dto/updated-professor.dto';

@Controller('professors')
export class ProfessorsController {
  constructor(private professorsService: ProfessorsService) {}

  @Post()
  async addProfessor(
    @Body() newProfessor: NewProfessorDto,
  ): Promise<Professor> {
    return await this.professorsService.addNewProfessor(newProfessor);
  }

  @Get('/:id')
  async getProfessor(@Param('id') id: string): Promise<Professor> {
    return await this.professorsService.getProfessor(id);
  }

  @Get()
  async getProfessors(): Promise<Professor[]> {
    return await this.professorsService.getAllProfessors();
  }

  @Put(':id')
  async updateProfessor(
    @Param('id') id: string,
    @Body() updates: UpdatedProfessorDto,
  ): Promise<Professor> {
    return await this.professorsService.updateProfessor(id, updates);
  }
}
