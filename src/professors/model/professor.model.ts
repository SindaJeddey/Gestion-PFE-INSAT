import * as mongoose from 'mongoose';
import {
  Conference,
  ConferenceSchema,
} from '../../conferences/model/conference.model';
import { Project, ProjectSchema } from '../../projects/model/project.model';

export const ProfessorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value,
        );
      },
      message: 'Email Not Valid',
    },
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: ['GPI', 'GIM', 'GBC'],
    required: true,
  },
  currentSupervisedProject: ProjectSchema,
  oldSupervisedProjects: [ProjectSchema],
  conferences: [
    {
      conference: ConferenceSchema,
      role: { type: String, enum: ['President', 'Supervisor', 'Inspector'] },
    },
  ],
});

export interface Professor extends mongoose.Document{
  email: string;
  name: string;
  lastName: string;
  department: string;
  currentSupervisedProject: Project;
  oldSupervisedProjects: [Project];
  conferences: [];
}
