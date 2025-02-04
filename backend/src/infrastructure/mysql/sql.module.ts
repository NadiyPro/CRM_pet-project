import * as path from 'node:path';
import * as process from 'node:process';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config, DatabaseConfig } from '../../configs/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Config>) => {
        // useFactory - функція, яка виконує логіку для налаштування підключення до БД.
        // Вона отримує ConfigService як залежність і використовує його для отримання налаштувань БД.
        const config = configService.get<DatabaseConfig>('database');
        // конфігурація для TypeORM завантажується з ConfigService,
        // з файлу configuration по ключу 'database'
        return {
          type: 'mysql', // вказуємо доя якої БД будемо конектитись
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.name,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'backend',
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
              'backend',
              'src',
              'infrastructure',
              'mysql',
              'migrations',
              '*.js',
            ),
          ],
          synchronize: false,
          // Якщо встановлено в false,
          // TypeORM не синхронізуватиме схему бази даних автоматично
          // (це рекомендується для продакшн середовища), тобто працюємо завжди з synchronize: false
          migrationsRun: true,
          // Автоматичний запуск міграцій при кожному старті додатка.
        };
      },
      inject: [ConfigService],
      // Вказується масив сервісів, які інжектуються (підкидується) в useFactory.
      // У цьому випадку інжектується ConfigService, який відповідає за надання налаштувань
    }),
  ],
})
export class SQLModule {}
