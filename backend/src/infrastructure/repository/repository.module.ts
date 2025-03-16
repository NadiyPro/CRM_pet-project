import { Global, Module } from '@nestjs/common';
import { UserRepository } from './services/user.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { OrdersRepository } from './services/orders.repository';
import { GroupRepository } from './services/group.repository';
import { MessageRepository } from './services/message.repository';
import { MySqlModule } from '../mysql/mysql.module';

const repositories = [
  RefreshTokenRepository,
  UserRepository,
  OrdersRepository,
  GroupRepository,
  MessageRepository,
];

@Global()
@Module({
  imports: [
    MySqlModule,
  ],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
