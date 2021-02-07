import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Payload } from './payload.interface';
import { UsersService } from '../../users/users.service';
import * as dotenv from 'dotenv';
import { AcademicYearService } from "../../academic-year/academic-year.service";

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT-SECRET-KEY'],
    });
  }

  async validate(payload: Payload) {
    const user = await this.userService.findOne(payload.email);
    if (user) {
      const { email, role } = user;
      return {
        email,
        role,
      };
    } else throw new UnauthorizedException();
  }
}
