import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async checkEmail(email: string) {
    const user = await this.userRepository.search(email);
    return user ? user : null;
  }
  async add(data: CreateUserDto) {
    return await this.userRepository.create(data);
  }
}
