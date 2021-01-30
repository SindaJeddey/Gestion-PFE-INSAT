import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './model/project.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
  ],
})
export class ProjectsModule {}
