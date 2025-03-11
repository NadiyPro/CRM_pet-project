import * as path from 'node:path';

import * as dotenv from 'dotenv';
import configuration from './src/configs/configuration';
import { DataSource } from 'typeorm';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = configuration().database;

const dataSource = new DataSource({
  type: 'mysql',
  host: config.host || 'owu.linkpc.net',
  port: config.port || 3306,
  username: config.user || 'nadiamysql',
  password: config.password || 'password',
  database: config.name || 'nadiamysql',
  entities: [
    // path.join(
    // process.cwd(), // Використовуємо cwd, щоб шукати від кореневої директорії
    // 'backend',
    // 'src',
    // 'infrastructure',
    // 'mysql',
    // 'entities',
    // '*.entity.{ts,.js}',
    //   __dirname,
    //   '..',
    //   'infrastructure',
    //   'mysql',
    //   'entities',
    //   '*.entity.{ts,.js}',
    // ),
    // path.join(
    //   __dirname,
    //   process.env.ENTITIES_PATH || 'src/infrastructure/mysql/entities/*.ts',
    // ),
    path.join(__dirname, 'src/infrastructure/mysql/entities/*.ts'),
  ],
  migrations: [
    // path.join(
    //   process.cwd(), // Використовуємо cwd
    //   'backend',
    //   'src',
    //   'infrastructure',
    //   'mysql',
    //   'migrations',
    //   '*.ts', // Шлях міграцій
    // ),
    // path.join(
    //   __dirname,
    //   '..',
    //   'infrastructure',
    //   'mysql',
    //   'migrations',
    //   '*.{ts,.js}',
    // ),
    // path.join(
    //   __dirname,
    //   process.env.MIGRATIONS_PATH || 'src/infrastructure/mysql/migrations/*.ts',
    // ),
    path.join(__dirname, 'src/infrastructure/mysql/migrations/*.ts'),
  ],
  // Шлях до файлів міграцій
  synchronize: false,
  logging: process.env.DB_LOGGING === 'true',
});
export default dataSource;
