import { RoleTypeEnum } from './enums/roleTypeEnum';

export interface AuthUserDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
  role: RoleTypeEnum;
}