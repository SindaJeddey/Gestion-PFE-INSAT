import * as mongoose from 'mongoose';

export const AcademicYearSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export interface AcademicYear extends mongoose.Document {
  startDate: Date;
  endDate: Date;
}
