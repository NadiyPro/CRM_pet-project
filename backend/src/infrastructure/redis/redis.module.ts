import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Config, RedisConfig } from '../../configs/config.type';
import { RedisService } from './services/redis.service';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('ENV TEST:', process.env.REDIS_PORT);

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<RedisConfig>('redis');
        if (!config) {
          throw new Error('Redis configuration is missing');
        }

        console.log(`Connecting to Redis at ${config.host}:${config.port}`);

        return new Redis({
          port: config.port,
          host: config.host,
          password: config.password,
          db: 0,
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
