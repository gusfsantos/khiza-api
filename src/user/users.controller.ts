import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { UsersEntity } from '../entities/users.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: Partial<UsersEntity>) {
    if (!user.email || !user.password || !user.name) {
      throw new UnprocessableEntityException('Need To Inform the credentials');
    }
    return await this.userService.create(user);
  }

  @Post('login')
  async login(@Body() user: { email: string; password: string }) {
    if (!user.email || !user.password) {
      throw new UnprocessableEntityException('Missing email/password');
    }
    return await this.userService.login(user);
  }
}
