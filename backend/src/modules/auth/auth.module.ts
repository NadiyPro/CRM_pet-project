import { UsersModule } from '../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { Jwt_accessGuard } from './guards/jwt_access.guard';
import { APP_GUARD } from '@nestjs/core';
import { Jwt_refreshGuard } from './guards/jwt_refresh.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';
import { RedisModule } from '../../infrastructure/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule, RedisModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: Jwt_accessGuard,
    },
    Jwt_refreshGuard,
    AuthService,
    AuthCacheService,
    TokenService,
  ],
  exports: [],
})
export class AuthModule {}
