import * as path from 'node:path';

import * as dotenv from 'dotenv';
// import configuration from './src/configs/configuration';
import { DataSource } from 'typeorm';
import configuration from './src/configs/configuration';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = configuration().database;

export default new DataSource({
  type: 'mysql',
  host: config.host || 'owu.linkpc.net',
  port: config.port || 3306,
  username: config.user || 'nadiamysql',
  password: config.password || 'password',
  database: config.name || 'nadiamysql',
  entities: [
    path.join(process.cwd(), 'src/infrastructure/mysql/entities/*.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src/infrastructure/mysql/migrations/*.ts'),
  ],
  // entities: [path.join(__dirname, 'src/infrastructure/mysql/entities/*.ts')],
  // migrations: [
  //   path.join(__dirname, 'src/infrastructure/mysql/migrations/*.ts'),
  // ],
  // Шлях файлів міграцій
  synchronize: false,
  // logging: process.env.DB_LOGGING === 'true',
});
// export default dataSource;
// export const createDataSource = (configService: ConfigService<Config>) => {
//   const config = configService.get<DatabaseConfig>('database');

//   return new DataSource({
//     type: 'mysql',
//     host: config.host || 'owu.linkpc.net',
//     port: config.port || 3306,
//     username: config.user || 'nadiamysql',
//     password: config.password || 'password',
//     database: config.name || 'nadiamysql',
//     entities: [path.join(__dirname, 'src/infrastructure/mysql/entities/*.ts')],
//     migrations: [
//       path.join(__dirname, 'src/infrastructure/mysql/migrations/*.ts'),
//     ],
//     synchronize: false,
//   });
// };
//
// // Експорт DataSource для зовнішнього використання
// export const AppDataSource = (configService: ConfigService) =>
// createDataSource(configService);
