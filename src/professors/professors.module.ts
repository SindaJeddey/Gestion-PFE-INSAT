import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorSchema } from './model/professor.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Professor', schema: ProfessorSchema }]),
  ],
})
export class ProfessorsModule {}
