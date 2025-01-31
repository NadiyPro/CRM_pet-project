import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { RedisModule } from './infrastructure/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { SQLModule } from './infrastructure/mySQL/sql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RepositoryModule,
    SQLModule,
    RedisModule,
    AuthModule,
    // EmailModule,
  ],
})
export class AppModule {}
