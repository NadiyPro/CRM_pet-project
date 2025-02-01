import { RoleTypeEnum } from '../../../users/enums/RoleType.enum';

export interface IUserData {
  userId: string;
  deviceId: string;
  email: string;
  role: RoleTypeEnum;
  is_active: boolean;
  deleted: Date | null;
}
