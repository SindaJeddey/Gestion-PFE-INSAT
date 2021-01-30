import * as mongoose from 'mongoose';
import { Session, SessionSchema } from '../../sessions/model/session.model';
import {
  Professor,
  ProfessorSchema,
} from '../../professors/model/professor.model';
import { Project, ProjectSchema } from '../../projects/model/project.model';

export const ConferenceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  session: {
    type: SessionSchema,
    required: true,
  },
  president: {
    type: ProfessorSchema,
    required: true,
  },
  inspector: {
    type: ProfessorSchema,
    required: true,
  },
  supervisor: {
    type: ProfessorSchema,
    required: true,
  },
  project: {
    type: ProjectSchema,
    required: true,
  },
  room: {
    type: String,
  },
});

export interface Conference extends mongoose.Document {
  date: Date;
  session: Session;
  president: Professor;
  inspector: Professor;
  supervisor: Professor;
  project: Project;
}
