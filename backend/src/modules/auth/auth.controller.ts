import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current_user.decorator';
import { SkipAuth } from './decorators/skip_auth.decorator';
import { Jwt_refreshGuard } from './guards/jwt_refresh.guard';
import { LoginReqDto } from './models/dto/req/login.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { TokenPairResDto } from './models/dto/res/token_pair.res.dto';
import { IUserData } from './models/interfaces/user_data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Для логінації на платформі',
    description:
      'Користувач виконує логінацію для входу на платформу (користувач вже зареєстрований).' +
      '*за замовченням для логінації: email === admin@gmail.com, password === admin',
  })
  @SkipAuth()
  @Post('login')
  public async login(@Body() dto: LoginReqDto): Promise<AuthResDto> {
    return await this.authService.login(dto);
  }

  // @ApiOperation({
  //   summary: 'Для видачі токена новому users',
  //   description:
  //     'Admin активує (is_active: true) роль для нового manage / admin, ' +
  //     'після чого на його email надходить лист з токеном, який діє 30 хв. ' +
  //     'Після переходу по даному посиланню, новий user виконує реєстрацію ' +
  //     '*При реєстрації роль buyer автоматично змінюється на роль seller.',
  // })
  // @SkipAuth()
  // @Post('registration')
  // public async registration(
  //   @Body() dto: RegistrationReqDto,
  // ): Promise<AuthResDto> {
  //   return await this.authService.registration(dto);
  // }
  // // singUp - тут логінація вконується (перший вхід з хешуванням паролю)

  // @ApiOperation({
  //   summary:
  //     'Для видалення токенів користувача за його user_id ("бан")',
  //   description:
  //     'Admin може видалити токени для входу в акаунт користувача за його user_id, ' +
  //     'таким чином поставити користувача в "бан". (!is_active)',
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN)
  // @Post('sign-outBLock/:user_id,')
  // public async signOutUserId(
  //   @Param('user_id', ParseUUIDPipe) user_id: string,
  // ): Promise<void> {
  //   return await this.authService.signOutUserId(user_id);
  // }

  // @ApiOperation({
  //   summary:
  //     'Для відновлення доступу до акаунту користувача за його user_id ("бан")',
  //   description:
  //     'Admin може відновити доступ для входу в акаунт користувача за його user_id (!is_active)',
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN)
  // @Post('sign-unBLock/:user_id,')
  // public async signUnBlock(
  //   @Param('user_id', ParseUUIDPipe) user_id: string,
  // ): Promise<void> {
  //   return await this.authService.signUnBlock(user_id);
  // }

  // @ApiOperation({
  //   summary: 'Для отримання нової пари токенів',
  //   description: 'Для отримання нової пари токенів.',
  // })
  // @ApiBearerAuth()
  // @UseGuards(Jwt_refreshGuard)
  // @Post('refresh')
  // public async refresh(
  //   @CurrentUser() userData: IUserData,
  // ): Promise<TokenPairResDto> {
  //   return await this.authService.refresh(userData);
  // }
}
