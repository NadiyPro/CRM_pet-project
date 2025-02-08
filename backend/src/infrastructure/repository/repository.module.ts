import { Global, Module } from '@nestjs/common';
import { UserRepository } from './services/user.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { OrdersRepository } from './services/orders.repository';
import { GroupRepository } from './services/group.repository';
import { MessageRepository } from './services/message.repository';

const repositories = [
  RefreshTokenRepository,
  UserRepository,
  OrdersRepository,
  GroupRepository,
  MessageRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
  // Список провайдерів, які будуть доступні за межами цього модуля.
  // Оскільки модуль глобальний,
  // ці сервіси зможуть використовуватися в будь-якому іншому модулі
})
export class RepositoryModule {}
