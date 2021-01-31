import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
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
  nce: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[0-9]*$/.test(value),
      message: 'Invalid Student Number',
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
  field: {
    type: String,
    enum: ['GL', 'RT', 'IMI', 'IIA', 'CH', 'BIO'],
    required: true,
  },
  level: {
    type: String,
    enum: ['CYCLE', 'MASTER', 'LICENCE'],
    required: true,
  },
});

export interface Student extends mongoose.Document {
  email: string;
  nce: string;
  name: string;
  lastName: string;
  field: string;
  level: string;
}
