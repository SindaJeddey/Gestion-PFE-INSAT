import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademicYear } from './model/academic-year.model';
import { NewAcademicYearDto } from './model/dto/new-academic-year.dto';

@Injectable()
export class AcademicYearService {
  constructor(
    @InjectModel('AcademicYear') private academicYearModel: Model<AcademicYear>,
  ) {}

  async createNewAcademicYear(
    newYear: NewAcademicYearDto,
  ): Promise<AcademicYear> {
    if (await this.getCurrentAcademicYear())
      throw new BadRequestException('An academic year is already happening');
    if (
      newYear.endYear < newYear.startYear ||
      newYear.endYear - newYear.startYear !== 1
    )
      throw new BadRequestException('Invalid year');
    const academicYear = new this.academicYearModel({
      startDate: new Date(newYear.startYear, 9, 1),
      endDate: new Date(newYear.endYear, 8, 31),
    });
    return await academicYear.save();
  }

  async getCurrentAcademicYear(): Promise<AcademicYear> {
    const now = new Date();
    const currentAcademicYear = await this.academicYearModel.findOne({
      startDate: { $lte: now },
      endDate: { $gte: now },
    });
    return currentAcademicYear;
  }
}
