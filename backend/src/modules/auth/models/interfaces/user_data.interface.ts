import { RoleTypeEnum } from '../../../users/enums/RoleType.enum';

export interface IUserData {
  userId: string;
  deviceId: string;
  email: string;
  role: RoleTypeEnum;
  deleted: Date | null;
}
