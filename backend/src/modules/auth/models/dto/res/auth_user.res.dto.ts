import { PickType } from '@nestjs/swagger';

import { BaseResDto } from '../../../../users/models/dto/res/baseUser.res.dto';

export class AuthUserResDto extends PickType(BaseResDto, [
  'email',
  'name',
  'surname',
  'is_active',
  'role',
]) {}
