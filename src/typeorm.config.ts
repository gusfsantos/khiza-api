import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(
      this.configService.get('DB_HOST'),
      this.configService.get('DB_PORT'),
    );
    return {
      type: 'mysql',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASS'),
      database: this.configService.get('DB_NAME'),
      synchronize: true,
      dropSchema: false,
      keepConnectionAlive: true,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}
