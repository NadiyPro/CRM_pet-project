import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IsNull } from 'typeorm';
import { Request, Response } from 'express';

import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../users/service/user.mapper';
import { SKIP_AUTH } from '../decorators/skip_auth.decorator';
import { TokenType } from '../enums/token_type.enum';
import { TokenService } from '../services/token.service';
import { AuthCacheService } from '../services/auth-cache.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const authHeader: string = request.get('Authorization');
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const accessToken = authHeader.startsWith('Bearer ')
      ? authHeader.split('Bearer ')[1]
      : null;
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );
    if (!isAccessTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
      deleted: IsNull(),
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    response.locals.user = UserMapper.toIUserData(user, payload);
    return true;
  }
}
