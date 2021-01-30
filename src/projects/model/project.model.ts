import * as mongoose from 'mongoose';
import { StudentSchema, Student } from '../../students/model/student.model';
import {
  ProfessorSchema,
  Professor,
} from '../../professors/model/professor.model';
import {
  Conference,
  ConferenceSchema,
} from '../../conferences/model/conference.model';

export const ProjectSchema = new mongoose.Schema({
  tile: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  conference: ConferenceSchema,
  student: {
    type: StudentSchema,
    required: true,
  },
  supervisor: {
    type: ProfessorSchema,
    required: true,
  },
});

export interface Project extends mongoose.Document {
  title: string;
  description: string;
  tag: [string];
  conference: Conference;
  student: Student;
  supervisor: Professor;
}
