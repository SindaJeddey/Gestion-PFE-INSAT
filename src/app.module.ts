import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
