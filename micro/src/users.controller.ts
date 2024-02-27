import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './model';
import { UserService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Post('')
  @MessagePattern({ cmd: 'AUTH_REGISTER' })
  createUser(@Body() Payload: CreateUserDto) {
    return this.userService.createUser(Payload);
  }

  @Get(':username')
  @MessagePattern({ cmd: 'AUTH_LOGIN' })
  getUser(@Param('username') username: string, @Body() payload: string) {
    if (!username) {
      return this.userService.getUserByUsername(payload);
    }
    return this.userService.getUserByUsername(username);
  }

  @Post('query-demo')
  @MessagePattern({ cmd: 'QUERY_DATA_PRINT' })
  printName(@Query() queryData, @Body() payload) {
    if (Object.keys(payload).length === 0) {
      return this.userService.getSentence(queryData);
    }

    return this.userService.getSentence(payload);
  }
}
