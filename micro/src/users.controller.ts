import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './model';
import { UserService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private userservice: UserService) {}
  @Post('')
  @MessagePattern({ cmd: 'AUTH_REGISTER' })
  createUser(@Body() Payload: CreateUserDto) {
    console.log('hello');

    return this.userservice.createUser(Payload);
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    console.log('🚀 ~ UsersController ~ getUser ~ username:', username);
    return this.userservice.getUserByUsername(username);
  }

  @MessagePattern({ cmd: 'AUTH_LOGIN' })
  getUserByUserName(payload) {
    console.log('🚀 ~ UsersController ~ getUserByUserName ~ payload:', payload);
    return this.userservice.getUserByUsername(payload.username);
  }
}
