import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { SessionsModule } from './sessions/sessions.module';
import { ProjectsModule } from './projects/projects.module';
import { ConferencesModule } from './conferences/conferences.module';
import * as dotenv from 'dotenv';
import { AcademicYearModule } from './academic-year/academic-year.module';
import { EnterprisesModule } from './enterprises/enterprises.module';
import { MailingModule } from './mailing/mailing.module';
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./authentication/guards/roles.guard";

dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'development'
        ? process.env.DATABASE_URI_DEV
        : process.env.DATABASE_URI_PROD,
    ),
    AuthenticationModule,
    UsersModule,
    StudentsModule,
    ProfessorsModule,
    SessionsModule,
    ProjectsModule,
    ConferencesModule,
    AcademicYearModule,
    EnterprisesModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
