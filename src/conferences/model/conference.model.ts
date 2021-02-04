import * as mongoose from 'mongoose';
import { Session } from '../../sessions/model/session.model';
import { Professor } from '../../professors/model/professor.model';
import { Project } from '../../projects/model/project.model';

export const ConferenceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  president: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
  enterpriseSupervisor: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  room: {
    type: String,
    required: true,
    enum: ['2B6-1', '2B6-2', '2B6-3', '2B6-4'],
  },
});

export interface Conference extends mongoose.Document {
  date: Date;
  room: string;
  session: Session;
  president: Professor;
  inspector: Professor;
  supervisor: Professor;
  enterpriseSupervisor: string;
  project: Project;
}
