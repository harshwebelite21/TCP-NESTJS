import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RegisterDTO } from './model';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5001,
      },
    });
  }

  // How to handle the request with has param
  @Get('/login/:username')
  createUser(@Param('username') username: string) {
    return this.client.send({ cmd: 'AUTH_LOGIN' }, username);
  }

  @Post('/register')
  getUser(@Body() payload: RegisterDTO) {
    return this.client.send({ cmd: 'AUTH_REGISTER' }, payload);
  }

  // Gateway with Query Data
  @Post('/print-name')
  printName(@Query() queryData) {
    return this.client.send({ cmd: 'QUERY_DATA_PRINT' }, queryData);
  }
}
