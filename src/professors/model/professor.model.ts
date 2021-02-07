import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

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
  cin: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[0-9]*$/.test(value),
      message: 'Invalid CIN',
    },
  },
  department: {
    type: String,
    enum: ['GPI', 'GMI', 'GBC'],
    required: true,
  },
  rank: {
    type: String,
    enum: [
      'PROFESSOR',
      'MAITRE DE CONFERENCES',
      'MAITRE ASSISTANT',
      'ASSISTANT',
    ],
    required: true,
  },
});

export interface Professor extends Document {
  email: string;
  name: string;
  lastName: string;
  department: string;
  rank: string;
}
