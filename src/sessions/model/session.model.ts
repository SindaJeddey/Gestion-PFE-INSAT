import * as mongoose from 'mongoose';
import { Professor } from '../../professors/model/professor.model';
import { Conference } from '../../conferences/model/conference.model';

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
  conferences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conference',
      required: true,
    },
  ],
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
