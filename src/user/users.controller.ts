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
import { UserDto, UserLoginDto } from '../dtos/user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

  @Post('login')
  async login(@Body() user: UserLoginDto) {
    if (!user.email || !user.password) {
      throw new UnprocessableEntityException('Missing email/password');
    }
    return await this.userService.login(user);
  }
}
