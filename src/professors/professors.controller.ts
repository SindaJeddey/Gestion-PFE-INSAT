import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewProfessorDto } from './model/dto/new-professor.dto';
import { Professor } from './model/professor.model';
import { ProfessorsService } from './professors.service';

@Controller('professors')
export class ProfessorsController {
  constructor(private professorsService: ProfessorsService) {}

  @Post()
  async addProfessor(
    @Body() newProfessor: NewProfessorDto,
  ): Promise<Professor> {
    return await this.professorsService.addNewProfessor(newProfessor);
  }

  @Get()
  async getProfessor(@Body('email') email: string): Promise<Professor> {
    return await this.professorsService.getProfessor(email);
  }

  @Get('/all')
  async getProfessors(): Promise<Professor[]> {
    return await this.professorsService.getAllProfessors();
  }
}
