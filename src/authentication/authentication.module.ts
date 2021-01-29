import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/model/user';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthenticationService, UsersService],
})
export class AuthenticationModule {}
