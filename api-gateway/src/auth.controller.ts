import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './model';
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
  @Get('/login')
  createUser(@Body() payload: LoginDTO) {
    console.log('🚀 ~ AuthController ~ createUser ~ payload:', payload);
    return this.client.send({ cmd: 'AUTH_LOGIN' }, payload);
  }

  @Post('/register')
  getUser(@Body() payload: RegisterDTO) {
    console.log('🚀 ~ AuthController ~ getUser ~ payload:', payload);
    console.log('hello');

    return this.client.send({ cmd: 'AUTH_REGISTER' }, payload);
  }
}
