import { Module } from '@nestjs/common';
import { ReservoirService } from './reservoir.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [ReservoirService],
  exports: [ReservoirService],
  imports: [
    HttpModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        baseURL: config.get('RESERVOIR_URL'),
        headers: {
          'x-api-key': config.get('RESERVOIR_TOKEN'),
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class ReservoirModule {}
