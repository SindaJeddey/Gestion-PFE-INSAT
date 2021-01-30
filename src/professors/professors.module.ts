import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorSchema } from './model/professor.model';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Professor', schema: ProfessorSchema }]),
    UsersModule
  ],
  providers: [ProfessorsService],
  controllers: [ProfessorsController],
})
export class ProfessorsModule {}
