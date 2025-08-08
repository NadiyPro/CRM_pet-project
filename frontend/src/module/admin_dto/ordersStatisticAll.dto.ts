import { RoleTypeEnum } from "../enums/roleTypeEnum";

export interface OrdersStatisticAllDto {
  roleAuth: RoleTypeEnum;
  total: number | null;
  In_work: number | null;
  New: number | null;
  Aggre: number | null;
  Disaggre: number | null;
  Dubbing: number | null;
}