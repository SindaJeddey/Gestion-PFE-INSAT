import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './model/project.model';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersModule } from '../users/users.module';
import { StudentsModule } from '../students/students.module';
import { ProfessorsModule } from '../professors/professors.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    UsersModule,
    StudentsModule,
    ProfessorsModule,
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
