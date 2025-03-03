import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import configuration from './configs/configuration';

dotenv.config();

const config = configuration().database;

export default new DataSource({
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.name,
  entities: [
    path.join(
      __dirname,
      'infrastructure',
      'mysql',
      'entities',
      '*.entity.{ts,.js}',
    ),
  ],
  migrations: [
    path.join(__dirname, 'infrastructure', 'mysql', 'migrations', '*.ts'),
  ],
  // Шлях до файлів міграцій
  synchronize: false,
});
