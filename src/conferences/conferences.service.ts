import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conference } from './model/conference.model';
import { NewConferenceDto } from './model/dto/new-conference.dto';
import { ProfessorsService } from '../professors/professors.service';
import { ProjectsService } from '../projects/projects.service';
import { SessionsService } from '../sessions/sessions.service';
import { Professor } from '../professors/model/professor.model';
import { Session } from '../sessions/model/session.model';
import { Project } from '../projects/model/project.model';
import { UpdateConferenceDto } from './model/dto/update-conference.dto';
import { MailingService } from '../mailing/mailing.service';

@Injectable()
export class ConferencesService {
  constructor(
    @InjectModel('Conference') private conferenceModel: Model<Conference>,
    private professorsService: ProfessorsService,
    private projectsService: ProjectsService,
    private sessionsService: SessionsService,
    private mailingService: MailingService,
  ) {}

  private async verifyRoomAndDate(
    room: string,
    date: Date,
    session: Session,
  ): Promise<boolean> {
    if (date < session.startDate || date > session.endDate)
      throw new BadRequestException('Date invalid for the given session');
    const conference = await this.conferenceModel
      .findOne({ room, date })
      .exec();
    if (!conference) return true;
    else throw new BadRequestException(`Room and Date are already taken`);
  }

  private async verifyProfessorAvailability(
    professorId: string,
    date: Date,
  ): Promise<Professor> {
    const professor = await this.professorsService.getProfessor(professorId);
    const conference = await this.conferenceModel.findOne({
      date,
      $or: [
        { president: professor },
        { inspector: professor },
        { supervisor: professor },
      ],
    });
    if (!conference) return professor;
    else throw new BadRequestException(`Professor ${professorId} unavailable`);
  }

  private async verifyProjectValidity(projectId: string): Promise<Project> {
    const project = await this.projectsService.getProject(projectId);
    if (!project.validity)
      throw new BadRequestException(`Project ${projectId} not validated yet`);
    const conference = await this.conferenceModel.findOne({ project });
    if (!conference) return project;
    else
      throw new BadRequestException(
        `Project ${projectId} has a conference already`,
      );
  }

  async createConference(newConference: NewConferenceDto): Promise<Conference> {
    const project = await this.verifyProjectValidity(newConference.project);
    const { room, date } = newConference;
    const session = await this.sessionsService.getSession(
      newConference.session,
    );
    await this.verifyRoomAndDate(room, date, session);
    const president = await this.verifyProfessorAvailability(
      newConference.president,
      date,
    );
    const inspector = await this.verifyProfessorAvailability(
      newConference.inspector,
      date,
    );
    const supervisor = await this.verifyProfessorAvailability(
      project.supervisor._id,
      date,
    );
    const conference = new this.conferenceModel({
      date,
      session,
      president,
      inspector,
      supervisor,
      project,
      room,
      enterpriseSupervisor: project.enterpriseSupervisor,
    });
    const savedConference = await conference.save();
    if (savedConference) {
      await this.mailingService.sendEmail(
        project.student.email,
        'Project Conference',
        `Dear ${project.student.name} ${project.student.lastName},\n A conference for your project "${project.title}" has been fixated. Please check the platform for more details.`,
      );
      return savedConference;
    }
  }

  async getConferencesPerSession(sessionId: string): Promise<Conference[]> {
    const session = await this.sessionsService.getSession(sessionId);
    return await this.conferenceModel
      .find({ session })
      .populate('president student project supervisor inspector')
      .exec(); // populate the whole session
  }

  async updateConference(
    conferenceId: string,
    updates: UpdateConferenceDto,
  ): Promise<Conference> {
    const oldConference = await this.conferenceModel.findById(conferenceId);
    if (!oldConference)
      throw new NotFoundException(`Conference id ${conferenceId} not found`);

    if (updates.room && !updates.date) {
      updates = { ...updates, room: updates.room, date: oldConference.date };
    } else if (!updates.room && updates.date) {
      updates = { ...updates, room: oldConference.room, date: updates.date };
    } else if (updates.room && updates.date) {
      updates = { ...updates, room: updates.room, date: updates.date };
    } else
      updates = {
        ...updates,
        room: oldConference.room,
        date: oldConference.date,
      };

    if (updates.inspector) {
      let inspector;
      if (updates.inspector === oldConference.president._id.toString())
        inspector = await this.professorsService.getProfessor(
          updates.inspector,
        );
      else
        inspector = await this.verifyProfessorAvailability(
          updates.inspector,
          updates.date,
        );
      updates = { ...updates, inspector };
    }
    if (updates.president) {
      let president;
      if (updates.president === oldConference.inspector._id.toString())
        president = await this.professorsService.getProfessor(
          updates.president,
        );
      else
        president = await this.verifyProfessorAvailability(
          updates.president,
          updates.date,
        );
      updates = { ...updates, president };
    }
    const updatedConference = await oldConference.update(updates, { new: true });
    if (updatedConference) {
      await this.mailingService.sendEmail(
        updatedConference.project.student.email,
        'Project Conference Updated',
        `Dear ${updatedConference.project.student.name} ${updatedConference.project.student.lastName},\n The conference for your project "${updatedConference.project.title}" has been updated. Please check the platform for more details.`,
      );
      return updatedConference;
    }
  }

  async deleteConference(conferenceId: string) {
    const conference = await this.conferenceModel.findByIdAndDelete(
      conferenceId,
    );
    if (!conference)
      throw new NotFoundException(`Conference id ${conferenceId} not found`);
    else {
      await this.mailingService.sendEmail(
        conference.project.student.email,
        'Project Conference Deleted',
        `Dear ${conference.project.student.name} ${conference.project.student.lastName},\n The conference for your project "${conference.project.title}" has been deleted. Please check the platform for more details.`,
      );
    }
  }

  //get professor current year conferences : conferences + role prof dans le jury en français

}