import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from '../../../../users/models/dto/req/base_user.req.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class BaseAuthReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'name',
  'surname',
  'role',
]) {
  @IsNotEmpty() // перевіряє, щоб значення поля не було порожнім
  @IsString()
  readonly deviceId: string;
}
// PickType() дозволяє "вибрати" тільки конкретні поля з базового класу
// і використовувати їх у новому DTO
