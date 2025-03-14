import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Config, DatabaseConfig } from '../../configs/config.type';
// import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<DatabaseConfig>('database');
        return {
          type: 'mysql',
          host: config.host || 'owu.linkpc.net',
          port: config.port || 3306,
          username: config.user || 'nadiamysql',
          password: config.password || 'password',
          database: config.name || 'nadiamysql',
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
    }),
  ],
  // exports: [TypeOrmModule, DataSource],
})
export class MySqlModule {}

// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { DataSource } from 'typeorm';
// import { AppDataSource } from '../../../ormconfig';
//
// @Module({
//   providers: [
//     {
//       provide: DataSource,
//       useFactory: async (configService: ConfigService) => {
//         const dataSource = AppDataSource(configService);
//         if (!dataSource.isInitialized) {
//           await dataSource.initialize();
//         }
//         return dataSource;
//       },
//       inject: [ConfigService],
//     },
//   ],
//   exports: [DataSource], // Експортуємо DataSource для використання в репозиторіях
// })
// export class MySqlModule {}
