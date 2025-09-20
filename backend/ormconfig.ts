import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import configuration from './src/configs/configuration';

dotenv.config();

const config = configuration().database;
// створюєш DataSource поза NestJS-контейнером (у data-source.ts).
// тут ConfigService ще не доступний, бо він живе в DI NestJS.
// тому в цьому файлі працює тільки: const config = configuration().database;
// (викликаємо функцію з файлу configuration.ts та доступаємося там до database)

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
// ЧЕРЕЗ DataSource у TypeORM ми підключаємося до БД
// DataSource зберігає всі налаштування (хост, порт, юзер, пароль, тип БД, ентіті) і через нього ми працюємо з табл
