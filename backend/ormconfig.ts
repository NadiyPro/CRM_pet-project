import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import configuration from './src/configs/configuration';

dotenv.config();

const config = configuration().database;
// створюємо DataSource поза NestJS-контейнером (у data-source.ts)
// тут ConfigService ще не доступний, бо він живе в DI (dependency injection) NestJS
// тому в цьому файлі працює тільки: const config = configuration().database;
// (викликаємо функцію з файлу configuration.ts та доступаємося там до database)

export default new DataSource({
  type: 'mysql',
  host: config.host,
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
  // synchronize: false - щоб TypeORM не оновлював сам автоматично нашу БД і випадково нне стер дані,
  // тобто ми ставимо synchronize: false, щоб оновлювати БД самостійно через міграції,
  // так безпечніше для продакшен, бо це гарантує те що дані не зітруться випадково TypeORM
});
// через DataSource у TypeORM ми підключаємося до БД
// DataSource зберігає всі налаштування (хост, порт, юзер, пароль, тип БД, ентіті) і через нього ми працюємо з табл
