import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base_auth.req.dto';

export class RegistrationReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'name',
  'surname',
  'role',
  'is_active',
  'deviceId',
]) {}
// PickType() дозволяє "вибрати" тільки конкретні поля з базового класу
// і використовувати їх у новому DTO
