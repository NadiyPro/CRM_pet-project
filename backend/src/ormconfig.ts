import * as path from 'node:path';

import * as dotenv from 'dotenv';
import configuration from './configs/configuration';
import { DataSource } from 'typeorm';

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
    path.join(
      // process.cwd(), // Використовуємо cwd, щоб шукати від кореневої директорії
      // 'backend',
      // 'src',
      // 'infrastructure',
      // 'mysql',
      // 'entities',
      // '*.entity.{ts,.js}',
      __dirname,
      'src',
      'infrastructure',
      'mysql',
      'entities',
      '*.entity.{ts,.js}',
    ),
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
    path.join(
      __dirname,
      'src',
      'infrastructure',
      'mysql',
      'migrations',
      '*.ts',
    ),
  ],
  // Шлях до файлів міграцій
  synchronize: false,
});
//
// const ormConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: config.host,
//   port: config.port,
//   username: config.user,
//   password: config.password,
//   database: config.name,
//   entities: [
//     path.join(
//       __dirname,
//       '..',
//       'infrastructure',
//       'mysql',
//       'entities',
//       '*.entity{.ts,.js}',
//     ),
//     // path.join(
//     //   process.cwd(),
//     //   'src', // Додаємо 'src', бо NestJS працює зі 'src', а не 'dist'
//     //   'infrastructure',
//     //   'mysql',
//     //   'entities',
//     //   '*.entity.{ts,js}', // Видалено зайву крапку перед 'js'
//     // ),
//   ],
//   migrations: [
//     path.join(__dirname, '..', 'infrastructure', 'mysql', 'migrations', '*.ts'),
//     // path.join(
//     //   process.cwd(),
//     //   'src',
//     //   'infrastructure',
//     //   'mysql',
//     //   'migrations',
//     //   '*.ts',
//     // ),
//   ],
//   synchronize: false,
// };
//
// export default ormConfig;
// import * as path from 'node:path';
// import * as dotenv from 'dotenv';
// import configuration from './configs/configuration';
// import { DataSource } from 'typeorm';
//
// dotenv.config();
//
// const config = configuration().database;
//
// const dataSource = new DataSource({
//   type: 'mysql',
//   host: config.host,
//   port: config.port,
//   username: config.user,
//   password: config.password,
//   database: config.name,
//   entities: [
//     path.join(
//       __dirname,
//       '..',
//       'infrastructure',
//       'mysql',
//       'entities',
//       '*.entity{.ts,.js}', // Додано правильний шаблон для розширень
//     ),
//   ],
//   migrations: [
//     path.join(__dirname, '..', 'infrastructure', 'mysql', 'migrations', '*.ts'),
//   ],
//   synchronize: false, // Рекомендується використовувати міграції, а не синхронізацію в продакшн
// });
//
// export default dataSource;
// import * as path from 'node:path';
//
// import * as dotenv from 'dotenv';
// import configuration from './configs/configuration';
// import { DataSource } from 'typeorm';
// import { UserEntity } from './infrastructure/mysql/entities/user.entity';
// import { GroupEntity } from './infrastructure/mysql/entities/group.entity';
// import { MessageEntity } from './infrastructure/mysql/entities/message.entity';
// import { OrdersEntity } from './infrastructure/mysql/entities/orders.entity';
// import { RefreshTokenEntity } from './infrastructure/mysql/entities/refresh-token.entity';
//
// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
//
// const config = configuration().database;
// console.log(config);
//
// export default new DataSource({
//   type: 'mysql',
//   host: config.host || 'owu.linkpc.net',
//   port: config.port || 3306,
//   username: config.user || 'nadiamysql',
//   password: config.password || 'password',
//   database: config.name || 'nadiamysql',
//   entities: [
//     UserEntity,
//     GroupEntity,
//     MessageEntity,
//     OrdersEntity,
//     RefreshTokenEntity,
//   ],
//   migrations: [
//     path.join(
//       process.cwd(), // Використовуємо cwd
//       'backend',
//       'src',
//       'infrastructure',
//       'mysql',
//       'migrations',
//       '*.ts', // Шлях до міграцій
//     ),
//     // path.join(__dirname, 'infrastructure', 'mysql', 'migrations', '*.ts'),
//   ],
//   // Шлях до файлів міграцій
//   synchronize: false,
// });
