import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtRefreshGuard } from './guards/jwt_refresh.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';
import { RedisModule } from '../../infrastructure/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessGuard } from './guards/jwt_access.guard';
import { UsersModule } from '../users/users.module';
import { OrdersModule } from '../orders/orders.module';
import { EmailModule } from '../email/email.module';
import { CronOldRefreshToken } from './cron/remiveOldRefreshToken';

@Module({
  imports: [
    JwtModule,
    RedisModule,
    forwardRef(() => UsersModule),
    forwardRef(() => OrdersModule),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    JwtRefreshGuard,
    AuthService,
    AuthCacheService,
    TokenService,
    CronOldRefreshToken,
  ],
  exports: [TokenService],
})
export class AuthModule {}
