import { RoleTypeEnum } from '../../../../../infrastructure/mySQL/entities/enums/RoleType.enum';

export class BaseResDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
  // last_login: Date;
  role: RoleTypeEnum;
  deleted: Date | null;
}
