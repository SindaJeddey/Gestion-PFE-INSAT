import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/model/user';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt/jwt.strategy';

dotenv.config();
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env['JWT-SECRET-KEY'],
    }),
  ],
  providers: [JwtStrategy, UsersService],
})
export class AuthenticationModule {}
