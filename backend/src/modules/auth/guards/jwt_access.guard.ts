import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IsNull } from 'typeorm';
import { Request } from 'express';

import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../users/service/user.mapper';
import { SKIP_AUTH } from '../../decorators/skip_auth.decorator';
import { TokenType } from '../../enums/token_type.enum';
import { TokenService } from '../services/token.service';
import { AuthCacheService } from '../services/auth-cache.service';
import { IUserData } from '../models/interfaces/user_data.interface';

// @Injectable()
// export class JwtAccessGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,
//     private readonly tokenService: TokenService,
//     private readonly authCacheService: AuthCacheService,
//     private readonly userRepository: UserRepository,
//   ) {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (skipAuth) return true;
//     // this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [...]) –
//     // перевіряє, чи є метадані SKIP_AUTH на рівні методу або класу.
//     // context.getHandler() – отримує метод (наприклад, getUser у UserController).
//     // context.getClass() – отримує весь клас (наприклад, UserController).
//     // Якщо для методу або класу встановлений SKIP_AUTH,
//     // то аутентифікація пропускається, і запит одразу дозволяється (return true).
//     const request = context.switchToHttp().getRequest<Request>();
//     // const response = context.switchToHttp().getResponse<Response>();
//     // дістаємо обєкт запиту (request) - це об'єкт,
//     // таку як заголовки, параметри запиту, тіло запиту (body),
//     // параметри маршруту (route params), тощо.
//     // отримуємо HTTP-запит з контексту
//     // через switchToHttp() ми доступаємось до HTTP запиту,
//     // а через getRequest() дістаємо об'єкт запиту (request)
//
//     const authHeader: string = request.get('Authorization');
//     if (!authHeader) {
//       throw new UnauthorizedException();
//     }
//
//     const accessToken = authHeader.startsWith('Bearer ')
//       ? authHeader.split('Bearer ')[1]
//       : null;
//     if (!accessToken) {
//       throw new UnauthorizedException();
//     }
//     // дістанемо токен доступу з Authorization, беремо другий елемент масиву,
//     // тобто все, що йде після слова "Bearer "
//     // split() в JavaScript використовується для розділення рядка на масив,
//     // використовуючи певний роздільник
//
//     const payload = await this.tokenService.verifyToken(
//       accessToken,
//       TokenType.ACCESS,
//     );
//     if (!payload) {
//       throw new UnauthorizedException();
//     }
//     // перевіряємо токен, чи був він створений з використанням
//     // конкретного секретного ключа і чи не закінчився термін його дії
//
//     const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
//       payload.userId,
//       payload.deviceId,
//       accessToken,
//     );
//     if (!isAccessTokenExist) {
//       throw new UnauthorizedException();
//     }
//     // Метод isAccessTokenExist використовується в класі Jwt_accessGuard
//     // для перевірки, чи токен доступу вже існує в кеші
//
//     const user = await this.userRepository.findOneBy({
//       id: payload.userId,
//       deleted: IsNull(), // перевіряє, що поле deleted є null (тобто, користувач не видалений)
//     }); // шукаємо користувача в БД за userId, отриманим з токена
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//
//     request.res.locals.user = UserMapper.toIUserData(user, payload);
//     // UserMapper.toIUserData(user, payload) дані користувача перетворюються на формат,
//     // зручний для передачі в наступні етапи обробки запиту
//     // зберігає дані користувача, щоб вони були доступні у всьому ланцюжку обробки запиту
//     return true;
//     // вказує, що перевірка пройдена, і запит можна пропустити до наступного етапу.
//   }
// }
export interface CustomResponse extends Response {
  locals: {
    user?: IUserData;
    [key: string]: any;
  };
}

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
    // this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [...]) –
    // перевіряє, чи є метадані SKIP_AUTH на рівні методу або класу.
    // context.getHandler() – отримує метод (наприклад, getUser у UserController).
    // context.getClass() – отримує весь клас (наприклад, UserController).
    // Якщо для методу або класу встановлений SKIP_AUTH,
    // то аутентифікація пропускається, і запит одразу дозволяється (return true).
    const request = context.switchToHttp().getRequest<Request>();
    // const response = context.switchToHttp().getResponse<Response>();
    // дістаємо обєкт запиту (request) - це об'єкт,
    // таку як заголовки, параметри запиту, тіло запиту (body),
    // параметри маршруту (route params), тощо.
    // отримуємо HTTP-запит з контексту
    // через switchToHttp() ми доступаємось до HTTP запиту,
    // а через getRequest() дістаємо об'єкт запиту (request)
    const response = context.switchToHttp().getResponse<CustomResponse>();

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
    // дістанемо токен доступу з Authorization, беремо другий елемент масиву,
    // тобто все, що йде після слова "Bearer "
    // split() в JavaScript використовується для розділення рядка на масив,
    // використовуючи певний роздільник

    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    // перевіряємо токен, чи був він створений з використанням
    // конкретного секретного ключа і чи не закінчився термін його дії

    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );
    if (!isAccessTokenExist) {
      throw new UnauthorizedException();
    }
    // Метод isAccessTokenExist використовується в класі Jwt_accessGuard
    // для перевірки, чи токен доступу вже існує в кеші

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
      deleted: IsNull(), // перевіряє, що поле deleted є null (тобто, користувач не видалений)
    }); // шукаємо користувача в БД за userId, отриманим з токена
    if (!user) {
      throw new UnauthorizedException();
    }
    response.locals.user = UserMapper.toIUserData(user, payload);
    // request.res.locals.user = UserMapper.toIUserData(user, payload);
    // UserMapper.toIUserData(user, payload) дані користувача перетворюються на формат,
    // зручний для передачі в наступні етапи обробки запиту
    // зберігає дані користувача, щоб вони були доступні у всьому ланцюжку обробки запиту
    return true;
    // вказує, що перевірка пройдена, і запит можна пропустити до наступного етапу.
  }
}
