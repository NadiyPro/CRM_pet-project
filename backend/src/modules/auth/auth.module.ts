// import { UsersModule } from '../users/users.module';
// import { forwardRef, Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { Jwt_refreshGuard } from './guards/jwt_refresh.guard';
// import { AuthController } from './auth.controller';
// import { AuthService } from './services/auth.service';
// import { AuthCacheService } from './services/auth-cache.service';
// import { TokenService } from './services/token.service';
// import { RedisModule } from '../../infrastructure/redis/redis.module';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtAccessGuard } from './guards/jwt_access.guard';
//
// @Module({
//   imports: [forwardRef(() => UsersModule), JwtModule, RedisModule],
//   controllers: [AuthController],
//   providers: [
//     {
//       provide: APP_GUARD,
//       useClass: JwtAccessGuard,
//     },
//     Jwt_refreshGuard,
//     AuthService,
//     AuthCacheService,
//     TokenService,
//   ],
//   exports: [],
// })
// export class AuthModule {}
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtRefreshGuard } from './guards/jwt_refresh.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';
import { TokenService } from './services/token.service';
import { RedisModule } from '../../infrastructure/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessGuard } from './guards/jwt_access.guard';

@Module({
  //   imports: [
  //     // forwardRef(() => UsersModule),
  //     JwtModule,
  //     RedisModule,
  //     TypeOrmModule.forFeature([UserEntity]), // Додано UserEntity
  //   ],
  //   controllers: [AuthController],
  //   providers: [
  //     {
  //       provide: APP_GUARD,
  //       useClass: JwtAccessGuard,
  //     },
  //     Jwt_refreshGuard,
  //     AuthService,
  //     AuthCacheService,
  //     TokenService,
  //   ],
  //   exports: [], // Додаємо TypeOrmModule до експорту
  // })
  imports: [JwtModule, RedisModule],
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
  ],
  exports: [],
})
export class AuthModule {}
