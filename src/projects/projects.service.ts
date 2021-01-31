import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './model/project.model';
import { NewProjectDto } from './model/dto/new-project.dto';
import { StudentsService } from '../students/students.service';
import { ProfessorsService } from '../professors/professors.service';
import { UpdatedProjectDto } from './model/dto/updated-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private projectModel: Model<Project>,
    private studentsService: StudentsService,
    private professorsService: ProfessorsService,
  ) {}

  async addProject(newProject: NewProjectDto): Promise<Project> {
    const student = await this.studentsService.getStudent(newProject.student);

    const projects = await this.projectModel.find({ student: student }).exec();
    if (projects.length === 3) {
      throw new ConflictException('Student already has 3 projects');
    } else {
      const existingProject = projects.filter(
        (project) => project.level === student.level,
      );
      if (existingProject.length !== 0)
        throw new ConflictException(
          'Student already has a project for his level',
        );
    }

    const supervisor = await this.professorsService.getProfessor(
      newProject.supervisor,
    );
    if (!newProject.tags) newProject.tags = [student.field];
    const project = new this.projectModel({
      ...newProject,
      student,
      supervisor,
      validity: false,
      level: student.level,
    });
    return await project.save();
  }

  async getStudentProject(id: string): Promise<Project> {
    const student = await this.studentsService.getStudent(id);
    const project = await this.projectModel
      .findOne({ student: student })
      .exec();
    if (!project)
      throw new NotFoundException("Student doesn't have a project yet");
    return project;
  }

  async updateProject(
    id: string,
    updates: UpdatedProjectDto,
  ): Promise<Project> {
    const student = await this.studentsService.getStudent(id);
    const project = await this.projectModel.findOneAndUpdate(
      { student },
      { ...updates },
      { new: true },
    );
    if (!project) throw new NotFoundException('Project Not Found');
    return project;
  }

  async validateProject(id: string) {
    const project = await this.projectModel.findByIdAndUpdate(id, {
      validity: true,
    });
    if (!project) throw new NotFoundException('Project Not Found');
  }

}
