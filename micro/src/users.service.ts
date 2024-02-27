import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly USERS = [
    {
      username: 'john',
      password: '123456',
    },
  ];

  createUser(user) {
    this.USERS.push(user);
    return this.USERS[this.USERS.length - 1];
  }

  getUserByUsername(username) {
    return this.USERS.find((user) => user.username === username);
  }

  getSentence(data) {
    return data.firstName + data.lastName;
  }
}
