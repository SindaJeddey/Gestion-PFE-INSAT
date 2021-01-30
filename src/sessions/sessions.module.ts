import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './model/session.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
  ],
})
export class SessionsModule {}
