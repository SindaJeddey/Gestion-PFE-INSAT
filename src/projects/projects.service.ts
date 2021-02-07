import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project } from "./model/project.model";
import { NewProjectDto } from "./model/dto/new-project.dto";
import { StudentsService } from "../students/students.service";
import { ProfessorsService } from "../professors/professors.service";
import { UpdatedProjectDto } from "./model/dto/updated-project.dto";
import { EnterprisesService } from "../enterprises/enterprises.service";
import { AcademicYearService } from "../academic-year/academic-year.service";
import { MailingService } from "../mailing/mailing.service";
import { State } from "./model/state.enum";
import { Session } from "../sessions/model/session.model";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private projectModel: Model<Project>,
    private studentsService: StudentsService,
    private professorsService: ProfessorsService,
    private enterpriseService: EnterprisesService,
    private academicYearService: AcademicYearService,
    private mailingService: MailingService,
  ) {}

  async addProject(
    newProject: NewProjectDto,
    studentEmail: string,
  ): Promise<Project> {
    const student = await this.studentsService.getStudentByEmail(studentEmail);

    const projects = await this.projectModel.find({ student: student }).exec();
    if (projects.length === 3) {
      throw new ConflictException(
        `Student id ${studentEmail} already has 3 projects`,
      );
    } else {
      const existingProject = projects.filter(
        (project) => project.level === student.level,
      );
      if (existingProject.length !== 0)
        throw new ConflictException(
          `Student id ${studentEmail} already has a project for his level`,
        );
    }
    const supervisor = await this.professorsService.getProfessorByEmail(
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
      state: State.NONE,
    }).populate('supervisor enterprise');
    const saved = await project.save();
    if (saved) {
      await this.mailingService.sendEmail(
        student.email,
        'New Project',
        `Dear ${student.name} ${student.lastName},\n Your project "${project.title}" has been added. Please check the platform for more details.`,
      );
      await this.mailingService.sendEmail(
        supervisor.email,
        'New project pending',
        `Dear ${supervisor.name} ${supervisor.lastName},\n You have a new project pending. Please check the platform for more details.`,
      );
    }
    return project;
  }

  async getProject(projectId: string): Promise<Project> {
    const project = await this.projectModel
      .findById(projectId)
      .populate('student supervisor');
    if (!project)
      throw new NotFoundException(`Project id ${projectId} Not Found`);
    else return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.projectModel
      .find()
      .populate('student supervisor enterprise session')
      .exec();
  }

  async getStudentCurrentProject(studentEmail: string): Promise<Project> {
    const student = await this.studentsService.getStudentByEmail(studentEmail);
    const project = await this.projectModel
      .findOne({ student: student, level: student.level })
      .populate('student supervisor enterprise')
      .exec();
    if (!project)
      throw new NotFoundException(
        `Student ${studentEmail} doesn't have a project yet`,
      );
    return project;
  }

  async getProfessorSupervisedProjects(
    professorEmail: string,
    state: string,
  ): Promise<Project[]> {
    const supervisor = await this.professorsService.getProfessorByEmail(
      professorEmail,
    );
    let filter;
    if (state !== 'all') {
      const academicYear = await this.academicYearService.getCurrentAcademicYear();
      if (state === 'current')
        filter = { supervisor, academicYear, acceptedBySupervisor: true };
      else
        filter = {
          supervisor,
          academicYear: { $ne: academicYear },
        };
    }
    return await this.projectModel.find(filter).exec();
  }

  async updateProject(
    studentEmail: string,
    updates: UpdatedProjectDto | any,
  ): Promise<Project> {
    const student = await this.studentsService.getStudentByEmail(studentEmail);
    const project = await this.projectModel
      .findOneAndUpdate({ student }, { ...updates }, { new: true })
      .populate('student session');
    if (!project)
      throw new NotFoundException(
        `Project for Student ${studentEmail} Not Found`,
      );
    await this.mailingService.sendEmail(
      student.email,
      'Project Update',
      `Dear ${student.name} ${student.lastName},\n Your project "${project.title}" has been updated. Please check the updates on the platform.`,
    );
    return project;
  }

  async validateProject(projectId: string) {
    const project = await this.projectModel
      .findOneAndUpdate(
        { _id: projectId, acceptedBySupervisor: true },
        {
          validity: true,
        },
      )
      .populate('student');
    if (!project)
      throw new NotFoundException(
        `Project ${projectId} Not Found or not accepted by supervisor yet`,
      );
    else {
      await this.mailingService.sendEmail(
        project.student.email,
        'Project Validated',
        `Dear ${project.student.name} ${project.student.lastName},\n Your project "${project.title}" has been validated. Please check the platform for more details.`,
      );
    }
  }

  async acceptProject(
    professorEmail: string,
    projectId: string,
  ): Promise<Project> {
    const project = await this.projectModel
      .findById(projectId)
      .populate('supervisor student');
    if (!project) throw new NotFoundException(`Project ${projectId} Not Found`);
    console.log(project);
    if (project.supervisor.email !== professorEmail)
      throw new ConflictException(
        `Project ${projectId} doesn't correspond to supervisor ${professorEmail}`,
      );

    const updated = await project.update(
      { acceptedBySupervisor: true },
      { new: true },
    );
    if (updated)
      await this.mailingService.sendEmail(
        project.student.email,
        'Project Accepted',
        `Dear ${project.student.name} ${project.student.lastName},\n Your project "${project.title}" has been accepted by ${project.supervisor.name} ${project.supervisor.lastName}. Please check the platform for more details..`,
      );
    return updated;
  }

  async deleteProjectByStudent(studentEmail: string) {
    const student = await this.studentsService.getStudentByEmail(studentEmail);
    const project = await this.projectModel.findOneAndDelete({
      student,
      level: student.level,
    });
    if (!project)
      throw new NotFoundException(
        `Project for student ${studentEmail} Not Found`,
      );
    else {
      await this.mailingService.sendEmail(
        project.student.email,
        'Project Deleted',
        `Dear ${project.student.name} ${project.student.lastName},\n Your project "${project.title}" has been deleted. Please check the platform for more details.`,
      );
    }
  }

  async deleteProjectByAdmin(projectId: string) {
    const project = await this.projectModel.findByIdAndDelete(projectId);
    if (!project)
      throw new NotFoundException(`Project id ${projectId} Not Found`);
    else {
      await this.mailingService.sendEmail(
        project.student.email,
        'Project Deleted',
        `Dear ${project.student.name} ${project.student.lastName},\n Your project "${project.title}" has been deleted. Please check the platform for more details..`,
      );
    }
  }

  async getProjectsToBeAcceptedByProfessor(
    professorEmail: string,
  ): Promise<Project[]> {
    const supervisorToBe = await this.professorsService.getProfessorByEmail(
      professorEmail,
    );
    return await this.projectModel
      .find({ supervisor: supervisorToBe, acceptedBySupervisor: false })
      .populate('student supervisor enterprise')
      .exec();
  }

  async getProjectsToBeValidatedByAdmin(): Promise<Project[]> {
    return await this.projectModel.find({ validity: false }).exec();
  }

  async getProjectsPerSession(session: Session): Promise<Project[]> {
    return await this.projectModel
      .find({ session })
      .populate('session supervisor student')
      .exec();
  }
}
