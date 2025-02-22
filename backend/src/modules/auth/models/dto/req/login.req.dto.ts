import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base_auth.req.dto';

export class LoginReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'is_active',
  'deviceId',
]) {}
