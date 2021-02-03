import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professor } from './model/professor.model';
import { NewProfessorDto } from './model/dto/new-professor.dto';
import { UsersService } from '../users/users.service';
import { Roles } from '../users/model/roles';
import { UpdatedProfessorDto } from './model/dto/updated-professor.dto';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectModel('Professor') private professorModel: Model<Professor>,
    private userService: UsersService,
  ) {}

  async addNewProfessor(newProfessor: NewProfessorDto): Promise<Professor> {
    const professor = new this.professorModel(newProfessor);
    const savedUser = this.userService.newUser({
      email: newProfessor.email,
      role: Roles.PROFESSOR,
    });
    if (savedUser) return await professor.save();
  }

  async getProfessor(professorId: string): Promise<Professor> {
    const professor = await this.professorModel.findById(professorId);
    if (!professor)
      throw new NotFoundException(`Professor ${professorId} not found`);
    return professor;
  }

  async getAllProfessors(): Promise<Professor[]> {
    return this.professorModel.find().exec();
  }

  async updateProfessor(
    professorId: string,
    updates: UpdatedProfessorDto,
  ): Promise<Professor> {
    const professor = this.professorModel.findByIdAndUpdate(
      professorId,
      { ...updates },
      { new: true },
    );
    if (!professor)
      throw new NotFoundException(`Professor ${professorId} not found`);
    return professor;
  }

  //search professors with filter
}
