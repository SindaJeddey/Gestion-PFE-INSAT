import * as mongoose from 'mongoose';

export const EnterpriseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

export interface Enterprise extends mongoose.Document{
  name: string;
  location: string;
  contact: string;
}
