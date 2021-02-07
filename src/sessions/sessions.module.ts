import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './model/session.model';
import { SessionsService } from './sessions.service';
import { AcademicYearModule } from '../academic-year/academic-year.module';
import { ProfessorsModule } from '../professors/professors.module';
import { SessionsController } from './sessions.controller';
import { ProjectsModule } from "../projects/projects.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
    AcademicYearModule,
    ProfessorsModule,
    ProjectsModule,
  ],
  providers: [SessionsService],
  exports: [SessionsService],
  controllers: [SessionsController],
})
export class SessionsModule {}
