import * as mongoose from 'mongoose';
import { Student } from '../../students/model/student.model';
import { Professor } from '../../professors/model/professor.model';
import { Conference } from '../../conferences/model/conference.model';

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
  conference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conference',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
  academicYear: {
    type: String,
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
