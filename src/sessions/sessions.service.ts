import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './model/session.model';
import { NewSessionDto } from './model/dto/new-session.dto';
import { AcademicYearService } from '../academic-year/academic-year.service';
import { ProfessorsService } from '../professors/professors.service';
import { UpdatedSessionDto } from "./model/dto/updated-session.dto";

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel('Session') private sessionModel: Model<Session>,
    private academicYearService: AcademicYearService,
    private professorsService: ProfessorsService,
  ) {}

  async createNewSession(newSession: NewSessionDto): Promise<Session> {
    const president = await this.professorsService.getProfessor(
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
      const president = await this.professorsService.getProfessor(
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
}
