import { BaseUsersDto } from './baseUsers.dto';

export interface ListUsersAllDto {
  users: BaseUsersDto[];
  total: number;
}