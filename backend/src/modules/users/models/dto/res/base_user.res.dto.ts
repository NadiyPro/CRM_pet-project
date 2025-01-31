import { RoleTypeEnum } from '../../../enums/RoleType.enum';

export class BaseResDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  is_active: string;
  last_login: Date;
  role: RoleTypeEnum;
  deleted: Date | null;
}
