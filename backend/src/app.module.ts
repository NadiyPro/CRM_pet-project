import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { RedisModule } from './infrastructure/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { OrdersModule } from './modules/orders/orders.module';
import { UsersModule } from './modules/users/users.module';
import { GroupModule } from './modules/group/group.module';
import { MessageModule } from './modules/message/message.module';
import { MySqlModule } from './infrastructure/mysql/mysql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MySqlModule,
    RepositoryModule,
    RedisModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    GroupModule,
    MessageModule,
    // EmailModule,
  ],
})
export class AppModule {}
