import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { RedisModule } from './infrastructure/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { SQLModule } from './infrastructure/mySQL/sql.module';
import { StudentsModule } from './modules/students/students.module';
import { UsersModule } from './modules/users/users.module';
import { GroupModule } from './modules/group/group.module';

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
    UsersModule,
    StudentsModule,
    GroupModule,
    // EmailModule,
  ],
})
export class AppModule {}
