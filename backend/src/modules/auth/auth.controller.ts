import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../decorators/skip_auth.decorator';
import { LoginReqDto } from './models/dto/req/login.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { AuthService } from './services/auth.service';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { Role } from '../decorators/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { CurrentUser } from '../decorators/current_user.decorator';
import { IUserData } from './models/interfaces/user_data.interface';
import { ActivatePasswordReqDto } from './models/dto/req/activatePassword.req.dto';
import { AuthUserResDto } from './models/dto/res/auth_user.res.dto';
import { TokenPairResDto } from './models/dto/res/token_pair.res.dto';
import { JwtRefreshGuard } from './guards/jwt_refresh.guard';

@ApiTags(TableNameEnum.AUTH)
@Controller(TableNameEnum.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Для логінації на платформі',
    description:
      'Користувач виконує логінацію для входу на платформу (користувач вже зареєстрований).' +
      '*за замовченням для логінації: email === admin@gmail.com, password === admin' +
      '*якщо email === admin@gmail.com, password === admin, ' +
      'то is_active: false автоматично замінюється на is_active === true, ' +
      'але якщо вказано інший email/password, ' +
      'то залогінитися можна лише при умові, що передається is_active === true',
  })
  @SkipAuth()
  @Post('login')
  public async login(@Body() dto: LoginReqDto): Promise<AuthResDto> {
    return await this.authService.login(dto);
  }

  @ApiOperation({
    summary: 'Для виходу з акаунту та видалення токенів користувача',
    description: 'Для виходу з акаунта та видалення токенів користувача',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  @Post('logOut')
  public async logOut(
    @CurrentUser() userData: IUserData,
  ): Promise<{ message: string }> {
    await this.authService.logOut(userData);
    return { message: 'Tokens deleted successfully' };
  }

  @ApiOperation({
    summary: 'Для видачі токена user (manager) для активації',
    description:
      'Admin активує (is_active: true) роль для нового manager ' +
      '/ натискає на кнопку для відновлення паролю manager, ' +
      'після чого на його email надходить лист з токеном, який діє 30 хв ' +
      '*Після переходу по даному посиланню, новий user (manager) виконує активацію нового паролю',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Get('activate/:managerId')
  public async activate(
    @Param('managerId') managerId: string,
  ): Promise<AuthResDto> {
    return await this.authService.activate(managerId);
  }

  @ApiOperation({
    summary: 'Для активації паролю manager',
    description:
      'Manager переходить за посиланням отриманим на email при активації ролі ' +
      'або відновлені паролю та вводить новий пароль, підтверджує його',
  })
  @SkipAuth()
  @Post('activate/:token')
  public async activatePassword(
    @Param('token') token: string,
    @Body() dto: ActivatePasswordReqDto,
  ): Promise<AuthResDto> {
    return await this.authService.activatePassword(token, dto);
  }

  @ApiOperation({
    summary:
      'Для блокування user (manager) (is_active = false) та видалення його токенів',
    description:
      'Для блокування user (manager) (is_active = false) та видалення його токенів',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Put('ban/:managerId')
  public async ban(
    @Param('managerId') managerId: string,
  ): Promise<AuthUserResDto> {
    return await this.authService.ban(managerId);
  }

  @ApiOperation({
    summary: 'Для розблокування user (manager) (is_active = true)',
    description: 'Для розблокування user (manager) (is_active = true)',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Put('unban/:managerId')
  public async unban(
    @Param('managerId') managerId: string,
  ): Promise<AuthUserResDto> {
    return await this.authService.unban(managerId);
  }

  @ApiOperation({
    summary: 'Для отримання нової пари токенів',
    description: 'Для отримання нової пари токенів.',
  })
  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }
}
