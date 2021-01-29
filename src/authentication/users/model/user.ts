import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value,
        );
      },
      message: 'Email Not Valid',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: ['ADMIN', 'PROFESSOR', 'STUDENT'],
    required: true,
  },
});

export interface User extends Document {
  email: string;
  password: string;
  role: string;
}
