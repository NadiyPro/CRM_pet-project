import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import configuration from './src/configs/configuration';

dotenv.config();
console.log('ENV TEST:', process.env.MYSQL_DB);

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
  synchronize: false,
});
