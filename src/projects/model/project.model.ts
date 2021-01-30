import * as mongoose from 'mongoose';
import { Student } from '../../students/model/student.model';
import { Professor } from '../../professors/model/professor.model';

export const ProjectSchema = new mongoose.Schema({
  title: {
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
    validate: {
      validator: (value) => /(\d{4}-\d{4})/.test(value),
      message: 'Invalid academic year',
    },
    required: true,
  },
});

export interface Project extends mongoose.Document {
  title: string;
  description: string;
  tags: string[];
  student: Student;
  supervisor: Professor;
  academicYear: string;
}
