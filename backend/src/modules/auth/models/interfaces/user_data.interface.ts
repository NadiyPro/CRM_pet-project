import { RoleTypeEnum } from '../../../../infrastructure/mysql/entities/enums/roleType.enum';

export interface IUserData {
  userId: string;
  surname: string;
  name: string;
  deviceId: string;
  email: string;
  role: RoleTypeEnum;
  is_active: boolean;
  deleted: Date | null;
}
