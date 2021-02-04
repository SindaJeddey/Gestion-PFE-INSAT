import { Module } from '@nestjs/common';
import { ConferencesController } from './conferences.controller';
import { ConferencesService } from './conferences.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConferenceSchema } from './model/conference.model';
import { ProjectsModule } from '../projects/projects.module';
import { ProfessorsModule } from '../professors/professors.module';
import { SessionsModule } from '../sessions/sessions.module';
import { MailingModule } from "../mailing/mailing.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Conference', schema: ConferenceSchema },
    ]),
    ProfessorsModule,
    ProjectsModule,
    SessionsModule,
    MailingModule,
  ],
  controllers: [ConferencesController],
  providers: [ConferencesService],
})
export class ConferencesModule {}
