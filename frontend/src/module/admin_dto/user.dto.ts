import { RoleTypeEnum } from '../enums/roleTypeEnum';

export interface UserDto{
  id: string;
  name: string | null;
  surname: string | null;
  email: string | null;
  role: RoleTypeEnum;
}