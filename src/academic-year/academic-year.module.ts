import { Module } from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { MongooseModule } from "@nestjs/mongoose";
import { AcademicYearSchema } from "./model/academic-year.model";
import { AcademicYearController } from './academic-year.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AcademicYear', schema: AcademicYearSchema },
    ]),
  ],
  providers: [AcademicYearService],
  controllers: [AcademicYearController],
})
export class AcademicYearModule {}
