import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // RepositoryModule,
    // PostgresModule,
    // RedisModule,
    // AuthModule,
    // EmailModule,
  ],
})
export class AppModule {}
