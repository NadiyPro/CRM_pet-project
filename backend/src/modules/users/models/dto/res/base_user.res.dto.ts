import { RoleTypeEnum } from '../../../enums/RoleType.enum';

export class BaseResDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: RoleTypeEnum;
  dealership?: string;
  avatar?: string;
  deleted: Date | null;
}
