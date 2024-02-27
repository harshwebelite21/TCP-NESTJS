import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto, QueryDTO } from './model';
import { UserService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Post('')
  @MessagePattern({ cmd: 'AUTH_REGISTER' })
  createUser(@Body() payload: CreateUserDto): CreateUserDto {
    return this.userService.createUser(payload);
  }

  @Get(':username')
  @MessagePattern({ cmd: 'AUTH_LOGIN' })
  getUser(
    @Param('username') username: string,
    @Body() payload: { username: string },
  ): CreateUserDto {
    if (!username) {
      return this.userService.getUserByUsername(payload.username);
    }
    return this.userService.getUserByUsername(username);
  }

  @Post('query-demo')
  @MessagePattern({ cmd: 'QUERY_DATA_PRINT' })
  printName(@Query() queryData: QueryDTO, @Body() payload: QueryDTO): string {
    if (!Object.keys(payload).length) {
      return this.userService.getSentence(queryData);
    }
    return this.userService.getSentence(payload);
  }
}
