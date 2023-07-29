import {
  IsBooleanString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(16)
  password: string;

  @IsBooleanString()
  @IsOptional()
  isAdmin?: string;
}
