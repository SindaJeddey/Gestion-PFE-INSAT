import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDto } from '../users/model/dto/userLogin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NewUserDto } from '../users/model/dto/newUser.dto';
import { User } from '../users/model/user.model';
import { UsersService } from '../users/users.service';
import { AcademicYearService } from "../academic-year/academic-year.service";

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private academicYearService: AcademicYearService,
  ) {}

  async login(loginCredentials: UserLoginDto) {
    const user = await this.userService.findOne(loginCredentials.email);
    if (!user)
      throw new NotFoundException(`Email ${loginCredentials.email} not found`);
    else {
      const hashedEnteredPassword = await bcrypt.hash(
        loginCredentials.password,
        user.salt,
      );
      if (hashedEnteredPassword !== user.password)
        throw new NotFoundException('Wrong Password');
      else {
        const academicYear = await this.academicYearService.getCurrentAcademicYear();
        const payload = { email: user.email, role: user.role, academicYear };
        return { accessToken: this.jwtService.sign(payload) };
      }
    }
  }

  async newUser(newUser: NewUserDto): Promise<User> {
    return this.userService.newUser(newUser);
  }
}
