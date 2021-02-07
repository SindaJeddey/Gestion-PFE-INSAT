import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professor } from './model/professor.model';
import { NewProfessorDto } from './model/dto/new-professor.dto';
import { UsersService } from '../users/users.service';
import { Role } from '../users/model/role.enum';
import { UpdatedProfessorDto } from './model/dto/updated-professor.dto';
import { MailingService } from '../mailing/mailing.service';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectModel('Professor') private professorModel: Model<Professor>,
    private userService: UsersService,
    private mailingService: MailingService,
  ) {}

  async addNewProfessors(newProfessors: NewProfessorDto[]) {
    for (const newProfessor of newProfessors) {
      const professor = new this.professorModel(newProfessor);
      const savedUser = this.userService.newUser({
        email: newProfessor.email,
        role: Role.PROFESSOR,
        name: newProfessor.name,
        lastName: newProfessor.lastName,
      });
      if (savedUser) await professor.save();
    }
  }

  async getProfessorById(professorId: string): Promise<Professor> {
    const professor = await this.professorModel.findById(professorId);
    if (!professor)
      throw new NotFoundException(`Professor ${professorId} not found`);
    return professor;
  }

  async getProfessorByEmail(professorEmail: string): Promise<Professor> {
    const professor = await this.professorModel.findOne({ email: professorEmail });
    if (!professor)
      throw new NotFoundException(`Professor ${professorEmail} not found`);
    return professor;
  }

  async getAllProfessors(): Promise<Professor[]> {
    return this.professorModel.find().exec();
  }

  async updateProfessor(
    professorId: string,
    updates: UpdatedProfessorDto,
  ): Promise<Professor> {
    const professor = await this.professorModel.findByIdAndUpdate(
      professorId,
      { ...updates },
      { new: true },
    );
    if (!professor)
      throw new NotFoundException(`Professor ${professorId} not found`);
    else {
      await this.mailingService.sendEmail(
        professor.email,
        'Profile Update',
        `Dear ${professor.name} ${professor.lastName},\n Your profile has been updated. Please check the platform for more details.`,
      );
      return professor;
    }
  }

  async deleteProfessor(professorId: string) {
    const professor = await this.professorModel.findByIdAndDelete(professorId);
    if (!professor)
      throw new NotFoundException(`Professor ${professorId} not found`);
  }
}
