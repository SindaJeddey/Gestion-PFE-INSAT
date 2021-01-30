import * as mongoose from 'mongoose';
import {
  ProfessorSchema,
  Professor,
} from '../../professors/model/professor.model';
import {
  Conference,
  ConferenceSchema,
} from '../../conferences/model/conference.model';

export const SessionSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  president: {
    type: ProfessorSchema,
    required: true,
  },
  conferences: [ConferenceSchema],
  capacity: {
    type: Number,
    required: true,
  },
});

export interface Session extends mongoose.Document{
  startDate: Date;
  endDate: Date;
  president: Professor;
  conferences: [Conference];
}
