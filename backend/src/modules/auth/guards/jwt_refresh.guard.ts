import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../users/service/user.mapper';
import { TokenType } from '../enums/token_type.enum';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    // дістаємо обєкт запиту (request) - це об'єкт,
    // таку як заголовки, параметри запиту, тіло запиту (body),
    // параметри маршруту (route params), тощо
    // ExecutionContext у NestJS — це об'єкт,
    // який містить контекст виконання запиту і дозволяє отримувати або
    // змінювати дані запиту на рівні Guards, Interceptors, і Filters

    const authHeader = request.headers.authorization;
    const refreshToken = authHeader?.startsWith('Bearer ')
      ? authHeader.split('Bearer ')[1]
      : null;
    // дістанемо токен доступу з Authorization, беремо другий елемент масиву,
    // тобто все, що йде після слова "Bearer "
    // split() в JavaScript використовується для розділення рядка на масив,
    // використовуючи певний роздільник
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );
    // перевіряємо токен, чи був він створений з використанням
    // конкретного секретного ключа і чи не закінчився термін його дії

    if (!payload) {
      throw new UnauthorizedException();
    }

    const isRefreshTokenExist =
      await this.refreshTokenRepository.isRefreshTokenExist(refreshToken);
    if (!isRefreshTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    response.locals.user = UserMapper.toIUserData(user, payload);
    return true;
  }
}
