import { Injectable } from '@nestjs/common';
import { CreateUserDto, QueryDTO } from './model';

@Injectable()
export class UserService {
  private readonly USERS = [
    {
      username: 'john',
      password: '123456',
    },
  ];

  createUser(user: CreateUserDto): CreateUserDto {
    this.USERS.push(user);
    return this.USERS[this.USERS.length - 1];
  }

  getUserByUsername(username: string): CreateUserDto {
    return this.USERS.find((user) => user.username === username);
  }

  getSentence(data: QueryDTO): string {
    return data.firstName + data.lastName;
  }
}
