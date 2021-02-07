import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AcademicYearModule } from "../academic-year/academic-year.module";

dotenv.config();
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env['JWT-SECRET-KEY'],
    }),
    UsersModule,
    AcademicYearModule,
  ],
  providers: [
    JwtStrategy,
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
