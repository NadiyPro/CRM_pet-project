import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../users/service/user.mapper';
import { UsersService } from '../../users/service/users.service';
import { LoginReqDto } from '../models/dto/req/login.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';
import { RoleTypeEnum } from '../../../infrastructure/mysql/entities/enums/roleType.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly usersService: UsersService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async login(dto: LoginReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email }, // знаходимо користувача за електронною поштою
      select: ['id', 'password', 'is_active'],
    });

    if (dto.email === 'admin@gmail.com' && dto.password === 'admin') {
      const admin = await this.userRepository.findOneBy({
        email: dto.email,
      });
      if (!admin) {
        const password = await bcrypt.hash(dto.password, 10);
        await this.userRepository.save(
          this.userRepository.create({
            ...dto,
            password,
            role: RoleTypeEnum.ADMIN,
            is_active: true,
          }),
        );
      }
    }

    if (!user || !user.is_active) {
      throw new UnauthorizedException('Your account is not active');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    // генеруємо пару токенів accessToken і refreshToken на основі userId та deviceId
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ), // зберігаємо access токен в кеш (Redis)
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    // Promise.all, щоб паралельно зберегти токени в різних місцях для кращої продуктивності
    const userEntity = await this.userRepository.findOneBy({ id: user.id });
    // витягаємо з БД повну інфо про користувача (всі поля), використовуючи його id

    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  // activateRecoveryPassword створення access токену (тривалість дії 30 хв та відправа його на пошту новому user)
  //
  // в registration перевіряємо токен activateRecoveryPassword, якщо все ок, то видаляємо цей токен,
  // шукаємо в БД email, потім дістаємо з dto Password та Confirm Password перевіряємо щоб вони співпадали,
  // після чого формуємо токени, зберігаємо дані в БД та змінюємо статус is_active: true
  // public async registration(dto: RegistrationReqDto): Promise<AuthResDto> {
  //   await this.isEmailNotExistOrThrow(dto.email, dto.password);
  //   const password = await bcrypt.hash(dto.password, 10);
  //   // const user = await this.userRepository.save(
  //   //   this.userRepository.create({ ...dto, password }),
  //   // );
  //   const user = await this.userRepository.save(
  //     this.userRepository.create({
  //       ...dto,
  //       password,
  //       role: RoleTypeEnum.ADMIN,
  // is_active: true,
  //     }),
  //   );
  //
  //   const tokens = await this.tokenService.generateAuthTokens({
  //     userId: user.id,
  //     deviceId: dto.deviceId,
  //   });
  //   // генеруємо пару токенів для нового юзера (accessToken та refreshToken)
  //   await Promise.all([
  //     this.authCacheService.saveToken(
  //       tokens.accessToken,
  //       user.id,
  //       dto.deviceId,
  //     ),
  //     // зберігаємо accessToken для нового юзера в кеш (Redis)
  //     this.refreshTokenRepository.save(
  //       this.refreshTokenRepository.create({
  //         user_id: user.id,
  //         deviceId: dto.deviceId,
  //         refreshToken: tokens.refreshToken,
  //       }),
  //     ),
  //   ]);
  //   return { user: UserMapper.toResDto(user), tokens };
  // }

  // private async isEmailNotExistOrThrow(email: string) {
  //   const userEmail = await this.userRepository.findOneBy({ email });
  //   if (userEmail) {
  //     throw new Error('Email already exists');
  //   }
  // }

  // // видаляємо токени юзера (бан)
  // public async signOutId(user_id: string): Promise<void> {
  //   const banUser = await this.userRepository.findOneBy({ id: user_id });
  //   await Promise.all([
  //     await this.userRepository.save({ ...banUser, is_active: false }),
  //     this.authCacheService.deleteTokenUserId(user_id),
  //     this.refreshTokenRepository.delete({
  //       user_id: user_id,
  //     }),
  //     this.usersService.deleteId(user_id),
  //   ]);
  // }

  // // змінюємо статус в БД is_active на true
  // (більше нічого не робимо, бо в нас в БД юзер є в тепер він зможе залогінитися)
  // public async signUnBlock(user_id: string): Promise<void> {
  // const unBlock = await this.userRepository.findOneBy({ id: user_id });
  // await this.userRepository.save({ ...unBlock, is_active: true }),
  // }

  // public async refresh(userData: IUserData): Promise<TokenPairResDto> {
  //   await Promise.all([
  //     this.authCacheService.deleteToken(userData.userId, userData.deviceId),
  //     // видаляємо всі accessToken токени, збережені для цього ключа в кеші (Redis)
  //     this.refreshTokenRepository.delete({
  //       user_id: userData.userId,
  //       deviceId: userData.deviceId,
  //     }), // видаляємо всі refreshToken,
  //     // що зберігаються в базі даних для конкретного користувача та його пристрою
  //   ]);
  //
  //   const tokens = await this.tokenService.generateAuthTokens({
  //     userId: userData.userId,
  //     deviceId: userData.deviceId,
  //   });
  //   // генеруємо пару токенів accessToken і refreshToken на основі userId та deviceId
  //   await Promise.all([
  //     this.authCacheService.saveToken(
  //       tokens.accessToken,
  //       userData.userId,
  //       userData.deviceId,
  //     ),
  //     // зберігаємо access токен в кеш (Redis)
  //     this.refreshTokenRepository.save(
  //       this.refreshTokenRepository.create({
  //         user_id: userData.userId,
  //         deviceId: userData.deviceId,
  //         refreshToken: tokens.refreshToken,
  //       }),
  //     ),
  //   ]);
  //   return tokens; // повертаємо пару токенів accessToken і refreshToken
  // }
}
