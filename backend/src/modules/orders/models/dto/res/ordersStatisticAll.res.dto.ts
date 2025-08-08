import { RoleTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/roleType.enum';

export interface OrdersStatisticAllResDto {
  roleAuth: RoleTypeEnum;
  total: number | null;
  In_work: number | null;
  New: number | null;
  Aggre: number | null;
  Disaggre: number | null;
  Dubbing: number | null;
}
