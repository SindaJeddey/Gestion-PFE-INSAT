import * as mongoose from 'mongoose';

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
  currentSupervisedProject: String,
  oldSupervisedProjects: [String],
  conferences: [
    {
      conference: String,
      role: { type: String, enum: ['President', 'Supervisor', 'Inspector'] },
    },
  ],
});

export interface Professor extends mongoose.Document{
  email: string;
  name: string;
  lastName: string;
  department: string;
  supervisedStudent: string;
  oldSupervisedProjects: [string];
  conferences: [];
}
