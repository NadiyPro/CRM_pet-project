import { Global, Module } from '@nestjs/common';
import { UserRepository } from './services/user.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { OrdersRepository } from './services/orders.repository';
import { GroupRepository } from './services/group.repository';
import { MessageRepository } from './services/message.repository';
// import { DataSource } from 'typeorm';
// import ormConfig from '../../../ormconfig';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from '../mysql/entities/user.entity';
// import { RefreshTokenEntity } from '../mysql/entities/refresh-token.entity';
// import { OrdersEntity } from '../mysql/entities/orders.entity';
// import { MessageEntity } from '../mysql/entities/message.entity';
// import { GroupEntity } from '../mysql/entities/group.entity';
import { MySqlModule } from '../mysql/mysql.module';

const repositories = [
  RefreshTokenRepository,
  UserRepository,
  OrdersRepository,
  GroupRepository,
  MessageRepository,
];

@Global()
// @Module({
//   providers: [...repositories],
//   exports: [...repositories],
//   // Список провайдерів, які будуть доступні за межами цього модуля.
//   // Оскільки модуль глобальний,
//   // ці сервіси зможуть використовуватися в будь-якому іншому модулі
// })
@Module({
  imports: [
    //     // TypeOrmModule.forFeature([
    //     //   UserEntity,
    //     //   RefreshTokenEntity,
    //     //   OrdersEntity,
    //     //   MessageEntity,
    //     //   GroupEntity,
    //     // ]),
    MySqlModule,
    //     DataSource,
  ], // Додаємо сутність RefreshToken
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
// const dataSourceProvider = {
//   provide: DataSource,
//   useFactory: async () => {
//     const dataSource = new DataSource(ormConfig);
//     return dataSource.initialize(); // Асинхронно підключаємо базу
//   },
// };

// @Global()
// @Module({
//   providers: [dataSourceProvider],
//   exports: [dataSourceProvider],
// })
// export class RepositoryModule {}
