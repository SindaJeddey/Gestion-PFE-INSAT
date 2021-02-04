import { Module } from '@nestjs/common';
import { ConferencesController } from './conferences.controller';
import { ConferencesService } from './conferences.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConferenceSchema } from './model/conference.model';
import { ProjectsModule } from '../projects/projects.module';
import { ProfessorsModule } from '../professors/professors.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Conference', schema: ConferenceSchema },
    ]),
    ProfessorsModule,
    ProjectsModule,
    SessionsModule,
  ],
  controllers: [ConferencesController],
  providers: [ConferencesService],
})
export class ConferencesModule {}
