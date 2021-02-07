import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'PROFESSOR', 'STUDENT'],
    required: true,
  },
  salt: String,
});

export interface User extends mongoose.Document {
  salt: any;
  email: string;
  name: string;
  lastName: string;
  password: string;
  role: string;
}
