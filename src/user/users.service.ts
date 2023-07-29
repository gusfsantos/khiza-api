import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: UserDto) {
    const exist = await this.userRepository.exist({
      where: { email: user.email },
    });
    if (exist) {
      throw new UnprocessableEntityException('E-mail already registered');
    }

    user.password = md5(`${user.password}:${user.email}`);
    const newUser: Partial<UsersEntity> = {
      email: user.email,
      password: user.password,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    return await this.userRepository.save(newUser);
  }

  async login(login: { email: string; password: string }) {
    const user = await this.findOneByEmail(login.email);
    const pass = md5(`${login.password}:${login.email}`);
    if (pass !== user.password) {
      throw new UnauthorizedException('Email/Password is wrong!');
    }
    const jwt = await this.jwtService.signAsync({
      sub: user.id,
      payload: user,
    });
    return {
      token: jwt,
      type: 'Bearer',
      expires: '10 minutes',
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundError('User not found!');
    }
    return user;
  }
}
