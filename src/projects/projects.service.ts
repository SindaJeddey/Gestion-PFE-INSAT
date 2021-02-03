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
import { EnterprisesService } from '../enterprises/enterprises.service';
import { AcademicYearService } from '../academic-year/academic-year.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private projectModel: Model<Project>,
    private studentsService: StudentsService,
    private professorsService: ProfessorsService,
    private enterpriseService: EnterprisesService,
    private academicYearService: AcademicYearService,
  ) {}

  async addProject(newProject: NewProjectDto): Promise<Project> {
    const student = await this.studentsService.getStudent(newProject.student);

    const projects = await this.projectModel.find({ student: student }).exec();
    if (projects.length === 3) {
      throw new ConflictException(
        `Student id ${newProject.student} already has 3 projects`,
      );
    } else {
      const existingProject = projects.filter(
        (project) => project.level === student.level,
      );
      if (existingProject.length !== 0)
        throw new ConflictException(
          `Student id ${newProject.student} already has a project for his level`,
        );
    }
    const supervisor = await this.professorsService.getProfessor(
      newProject.supervisor,
    );
    let enterprise;
    if (typeof newProject.enterprise === 'string')
      enterprise = await this.enterpriseService.getEnterprise(
        newProject.enterprise,
      );
    else {
      enterprise = await this.enterpriseService.addEnterprise(
        newProject.enterprise,
      );
    }
    if (!newProject.tags) newProject.tags = [student.field];
    const academicYear = await this.academicYearService.getCurrentAcademicYear();
    const project = new this.projectModel({
      ...newProject,
      student,
      supervisor,
      acceptedBySupervisor: false,
      validity: false,
      level: student.level,
      academicYear: academicYear._id,
      enterprise,
    });
    return await project.save();
  }

  async getStudentCurrentProject(studentId: string): Promise<Project> {
    const student = await this.studentsService.getStudent(studentId);
    const project = await this.projectModel
      .findOne({ student: student, level: student.level })
      .exec();
    if (!project)
      throw new NotFoundException(
        `Student id ${studentId} doesn't have a project yet`,
      );
    return project;
  }

  async getProfessorSupervisedProjects(
    professorId: string,
    state: string,
  ): Promise<Project[]> {
    const supervisor = await this.professorsService.getProfessor(professorId);
    let filter;
    if (state !== 'all') {
      const academicYear = await this.academicYearService.getCurrentAcademicYear();
      if (state === 'current') filter = { supervisor, academicYear };
      else filter = { supervisor, academicYear: { $ne: academicYear } };
    }
    return await this.projectModel.find(filter).exec();
  }

  async updateProject(
    studentId: string,
    updates: UpdatedProjectDto,
  ): Promise<Project> {
    const student = await this.studentsService.getStudent(studentId);
    const project = await this.projectModel.findOneAndUpdate(
      { student },
      { ...updates },
      { new: true },
    );
    if (!project)
      throw new NotFoundException(
        `Project for Student id ${studentId} Not Found`,
      );
    return project;
  }

  async validateProject(projectId: string) {
    const project = await this.projectModel.findOneAndUpdate(
      { _id: projectId, acceptedBySupervisor: true },
      {
        validity: true,
      },
    );
    if (!project)
      throw new NotFoundException(
        `Project ${projectId} Not Found or not accepted by supervisor yet`,
      );
  }

  //By Professor
  async acceptProject(
    professorId: string,
    projectId: string,
  ): Promise<Project> {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException(`Project ${projectId} Not Found`);
    if (project.supervisor._id.toString() !== professorId)
      throw new ConflictException(
        `Project ${projectId} doesn't correspond to supervisor ${professorId}`,
      );
    return await project.update({ acceptedBySupervisor: true });
  }

  async deleteProjectByStudent(studentId: string) {
    const student = await this.studentsService.getStudent(studentId);
    const project = await this.projectModel.findOneAndDelete({
      student,
      level: student.level,
    });
    if (!project)
      throw new NotFoundException(
        `Project for student id ${studentId} Not Found`,
      );
  }

  async deleteProjectByAdmin(projectId: string) {
    const project = await this.projectModel.findByIdAndDelete(projectId);
    if (!project)
      throw new NotFoundException(`Project id ${projectId} Not Found`);
  }
}
