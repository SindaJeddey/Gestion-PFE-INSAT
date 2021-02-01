import * as mongoose from 'mongoose';
import { Student } from '../../students/model/student.model';
import { Professor } from '../../professors/model/professor.model';
import { Enterprise } from '../../enterprises/model/enterprise.model';

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
  validity: {
    type: Boolean,
  },
  level: {
    type: String,
    enum: ['CYCLE', 'MASTER', 'LICENCE'],
    required: true,
  },
  enterprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: true,
  },
});

export interface Project extends mongoose.Document {
  title: string;
  description: string;
  tags: string[];
  student: Student;
  supervisor: Professor;
  validity: boolean;
  level: string;
  enterprise: Enterprise;
}
