import { Module } from '@nestjs/common';
import { CollectionController } from './collections/collection.controller';
import { TypeOrmConfig } from './typeorm.config';
import { ReservoirModule } from './reservoir/reservoir.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CollectionEntity } from './entities/collection.entity';
import { CollectionsService } from './collections/collections.service';
import { SyncController } from './sync/sync.controller';
import { UsersController } from './user/users.controller';
import { UsersService } from './user/users.service';
import { UsersEntity } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { SyncService } from './sync/sync.service';

@Module({
  imports: [
    ReservoirModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        const source = new DataSource(options);
        await source.initialize();
        return source;
      },
    }),
    TypeOrmModule.forFeature([CollectionEntity, UsersEntity]),
    JwtModule.register({
      secret: 'HardCode',
      global: true,
      signOptions: { expiresIn: 600 },
    }),
  ],
  controllers: [CollectionController, SyncController, UsersController],
  providers: [CollectionsService, UsersService, SyncService],
})
export class AppModule {}
