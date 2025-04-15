import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UserMapper } from '../../users/service/user.mapper';
import { LoginReqDto } from '../models/dto/req/login.req.dto';
import { AuthResDto } from '../models/dto/res/auth.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';
import { RoleTypeEnum } from '../../../infrastructure/mysql/entities/enums/roleType.enum';
import { IUserData } from '../models/interfaces/user_data.interface';
import { EmailTypeEnum } from '../../email/enums/email.enum';
import { EmailService } from '../../email/service/email.service';
import { ActivatePasswordReqDto } from '../models/dto/req/activatePassword.req.dto';
import { TokenType } from '../enums/token_type.enum';
import { AuthUserResDto } from '../models/dto/res/auth_user.res.dto';
import { TokenPairResDto } from '../models/dto/res/token_pair.res.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly emailService: EmailService,
  ) {}

  public async login(dto: LoginReqDto): Promise<AuthResDto> {
    let user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password', 'is_active'],
    });

    if (dto.email === 'admin@gmail.com' && dto.password === 'admin') {
      if (!user) {
        const password = await bcrypt.hash(dto.password, 10);
        await this.userRepository.save(
          this.userRepository.create({
            ...dto,
            password,
            name: 'admin_name',
            surname: 'admin_surname',
            role: RoleTypeEnum.ADMIN,
            is_active: true,
          }),
        );
      }
    }

    user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password', 'is_active'],
    });

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

  public async logOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteTokenUserId(userData.userId),
      this.refreshTokenRepository.delete({ user_id: userData.userId }),
    ]);
  }

  public async activate(managerId: string): Promise<AuthResDto> {
    const user = await this.userRepository.findOneBy({ id: managerId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokens = await this.tokenService.generateActiveTokens({
      userId: user.id,
    });
    // генеруємо пару токенів для нового юзера (accessToken та refreshToken)
    await Promise.all([
      this.authCacheService.saveActiveToken(tokens.accessToken, user.id),
      // зберігаємо accessToken для нового юзера в кеш (Redis)
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    await this.emailService.sendMail(
      EmailTypeEnum.ACTIVE,
      'siroviyn13@gmail.com',
      // user.email,
      {
        surname: user.surname,
        name: user.name,
        registration_password: `http://localhost:3000/auth/activate/${tokens.accessToken}`,
      },
    );
    return { user: UserMapper.toResDto(user), tokens };
  }

  public async activatePassword(
    token: string,
    dto: ActivatePasswordReqDto,
  ): Promise<AuthResDto> {
    const payload = await this.tokenService.verifyToken(
      token,
      TokenType.ACCESS,
    );
    let user = await this.userRepository.findOneBy({ id: payload.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (dto.password !== dto.confirm_password) {
      throw new BadRequestException(
        'The entered password does not match the confirmation password.',
      );
    }
    user.password = await bcrypt.hash(dto.password, 10);
    user.is_active = true;
    user = await this.userRepository.save(user);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    // генеруємо пару токенів для нового юзера (accessToken та refreshToken)
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      // зберігаємо accessToken для нового юзера в кеш (Redis)
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    return { user: UserMapper.toResDto(user), tokens };
  }

  public async ban(managerId: string): Promise<AuthUserResDto> {
    let user = await this.userRepository.findOneBy({ id: managerId });
    user.is_active = false;
    user = await this.userRepository.save(user);
    await this.refreshTokenRepository.delete({
      user_id: user.id,
    });
    return user;
  }

  public async unban(managerId: string): Promise<AuthUserResDto> {
    let user = await this.userRepository.findOneBy({ id: managerId });
    user.is_active = true;
    user = await this.userRepository.save(user);
    return user;
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    // await Promise.all([
    //   this.authCacheService.deleteToken(userData.userId, userData.deviceId),
    //   // видаляємо всі accessToken токени, збережені для цього ключа в кеші (Redis)
    //   this.refreshTokenRepository.delete({
    //     user_id: userData.userId,
    //     deviceId: userData.deviceId,
    //   }), // видаляємо всі refreshToken,
    //   // що зберігаються в базі даних для конкретного користувача та його пристрою
    // ]);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: userData.userId,
      deviceId: userData.deviceId,
    });
    // генеруємо пару токенів accessToken і refreshToken на основі userId та deviceId
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        userData.userId,
        userData.deviceId,
      ),
      // зберігаємо access токен в кеш (Redis)
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: userData.userId,
          deviceId: userData.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      // видаляємо всі accessToken токени, збережені для цього ключа в кеші (Redis)
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }), // видаляємо всі refreshToken,
      // що зберігаються в базі даних для конкретного користувача та його пристрою
    ]);
    return tokens; // повертаємо пару токенів accessToken і refreshToken
  }
}
