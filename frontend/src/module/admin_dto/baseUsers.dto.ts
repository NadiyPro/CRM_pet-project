import { RoleTypeEnum } from '../enums/roleTypeEnum';

export interface BaseUsersDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
  role: RoleTypeEnum;
  deleted: string | null;
}