import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Config, DatabaseConfig } from '../../configs/config.type';
import * as dotenv from 'dotenv';

dotenv.config();
// console.log('ENV TEST:', process.env.MYSQL_PORT);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Config>) => {
        // useFactory — це вбудована в NestJS опція для асинхронних модулів
        // вона дозволяє тобі створити власну функцію-фабрику, яка повертає об’єкт конфігурації (ключ: значення)
        // те що нам треба для налаштування TypeOrmModule
        const config = configService.get<DatabaseConfig>('database');
        return {
          type: 'mysql',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.name,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'infrastructure',
              'mysql',
              'entities',
              '*.entity.js',
            ),
          ],
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'infrastructure',
              'mysql',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false,
          migrationsRun: true,
        };
      },
      inject: [ConfigService],
      // inject використовується для тобто,
      // щоб NestJS передати потрібний сервіс (ConfigService) або декілька сервісів у мою фабрику (useFactory) з DI
    }),
  ],
})
export class MySqlModule {}
