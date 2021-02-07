import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './model/session.model';
import { NewSessionDto } from './model/dto/new-session.dto';
import { AcademicYearService } from '../academic-year/academic-year.service';
import { ProfessorsService } from '../professors/professors.service';
import { UpdatedSessionDto } from "./model/dto/updated-session.dto";
import { ProjectsService } from "../projects/projects.service";
import { SessionDto } from "./model/dto/session.dto";
import { State } from "../projects/model/state.enum";
import { UpdatedProjectDto } from "../projects/model/dto/updated-project.dto";
import { MailingService } from "../mailing/mailing.service";

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel('Session') private sessionModel: Model<Session>,
    private academicYearService: AcademicYearService,
    private professorsService: ProfessorsService,
    private projectsService: ProjectsService,
    private mailingService: MailingService,
  ) {}

  async createNewSession(newSession: NewSessionDto): Promise<Session> {
    const president = await this.professorsService.getProfessorById(
      newSession.president,
    );
    const academicYear = await this.academicYearService.getCurrentAcademicYear();
    const session = new this.sessionModel({
      ...newSession,
      startDate: new Date(newSession.startDate),
      endDate: new Date(newSession.endDate),
      president,
      academicYear,
    });
    return session.save();
  }

  async getCurrentYearSessions(): Promise<Session[]> {
    const academicYear = await this.academicYearService.getCurrentAcademicYear();
    return await this.sessionModel.find({ academicYear }).exec();
  }

  async getSession(sessionId: string): Promise<Session> {
    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session)
      throw new NotFoundException(`Session id ${sessionId} not found`);
    return session;
  }

  async getAllSessions(): Promise<Session[]> {
    return await this.sessionModel.find().exec();
  }

  async updateSession(
    sessionId: string,
    updates: UpdatedSessionDto,
  ): Promise<Session> {
    if (updates.president !== undefined) {
      const president = await this.professorsService.getProfessorById(
        updates.president,
      );
      updates.president = president;
    }
    const updatedSession = await this.sessionModel.findByIdAndUpdate(
      sessionId,
      { ...updates },
      { new: true },
    );
    if (!updatedSession)
      throw new NotFoundException(`Session id ${sessionId} not found`);
    return updatedSession;
  }

  async deleteSession(sessionId: string) {
    const session = await this.sessionModel.findByIdAndDelete(sessionId);
    if (!session)
      throw new NotFoundException(`Session id ${sessionId} not found`);
  }

  //Refacotr next methods for optimal fetchiiiing
  async reserveSession(
    reserveSession: SessionDto,
    studentEmail: string,
  ) {
    const project = await this.projectsService.getStudentCurrentProject(
      studentEmail,
    );
    if (project.session)
      throw new BadRequestException(
        `Project already pending for session ${project.session._id}`,
      );
    const session = await this.sessionModel.findById(reserveSession.sessionId);
    if (!session)
      throw new NotFoundException(
        `Session ${reserveSession.sessionId} not found.`,
      );
    else {
      const updates = new UpdatedProjectDto();
      updates.session = session;
      updates.state = State.PENDING;
      const updatedProject = await this.projectsService.updateProject(
        studentEmail,
        updates,
      );
      if (updatedProject)
        await this.mailingService.sendEmail(
          updatedProject.student.email,
          'Project Pending For Session',
          `Dear ${updatedProject.student.name} ${updatedProject.student.lastName},\n Your project "${updatedProject.title}" is now pending for demanded session. Please check the platform for more details.`,
        );
    }
  }

  async confirmProject(studentEmail: string) {
    const project = await this.projectsService.getStudentCurrentProject(
      studentEmail,
    );
    if (project.state === State.NONE || !project.session)
      throw new BadRequestException(
        `Project ${project._id} is not even pending`,
      );
    else {
      const session = await this.sessionModel.findById(project.session);
      const updates = new UpdatedProjectDto();
      if (session.conferences.length < session.capacity) {
        updates.state = State.CONFIRMED;
        const updatedProject = await this.projectsService.updateProject(
          studentEmail,
          updates,
        );
        if (updatedProject)
          await this.mailingService.sendEmail(
            updatedProject.student.email,
            'Project Confirmed For Session',
            `Dear ${updatedProject.student.name} ${updatedProject.student.lastName},\n Your project "${updatedProject.title}" is now confirmed for demanded session. Please check the platform for more details.`,
          );
      } else {
        updates.session = null;
        const updatedProject = await this.projectsService.updateProject(
          studentEmail,
          updates,
        );
        if (updatedProject)
          await this.mailingService.sendEmail(
            updatedProject.student.email,
            'Project Not Confirmed For Session',
            `Dear ${updatedProject.student.name} ${updatedProject.student.lastName},\n The session you demanded has reached its maximum capacity.\nMake sure to reserve for the next session. Please check the platform for more details.`,
          );
      }
    }
  }
}
