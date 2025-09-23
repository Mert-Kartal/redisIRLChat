import { BadRequestException, Injectable } from '@nestjs/common';
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
    const user = await this.checkEmail(data.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    return await this.userRepository.create(data);
  }
}
