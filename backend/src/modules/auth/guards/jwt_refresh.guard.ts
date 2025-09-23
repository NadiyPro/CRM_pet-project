import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../users/service/user.mapper';
import { TokenType } from '../../enums/token_type.enum';
import { TokenService } from '../services/token.service';
import { IJwtPayload } from '../models/interfaces/jwt_payload.interface';
import { CustomResponse } from './jwt_access.guard';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<CustomResponse>();

    // 1) Дістаємо токен: header -> body -> query (це допоможе тестувати через Swagger/curl)
    let refreshToken: string | null = null;
    const authHeader =
      request.headers.authorization ??
      (request.headers['Authorization'] as string | undefined);
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      refreshToken = authHeader.split('Bearer ')[1];
    }

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    // 2) Verify token (throws if invalid/expired)
    let payload: IJwtPayload;
    try {
      payload = await this.tokenService.verifyToken(
        refreshToken,
        TokenType.REFRESH,
      );
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // 3) Check existence in DB by userId + deviceId + refreshToken
    const exists = await this.refreshTokenRepository.isRefreshTokenExist(
      payload.userId,
      payload.deviceId,
      refreshToken,
    );
    if (!exists) {
      throw new UnauthorizedException('Refresh token not found');
    }

    // 4) Load user
    const user = await this.userRepository.findOneBy({ id: payload.userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 5) Put user into response.locals so controller decorator can read it
    // response.locals = response.locals || {};
    // response.locals.user = UserMapper.toIUserData(user, payload);
    response.locals.user = UserMapper.toIUserData(user, payload);

    return true;
  }
}
