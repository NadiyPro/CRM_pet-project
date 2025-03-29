import { UserEntity } from '../../../../../infrastructure/mysql/entities/user.entity';

export interface OrdersStatisticResDto {
  manager: UserEntity | null;
  total: number | null;
  In_work: number | null;
  New: number | null;
  Aggre: number | null;
  Disaggre: number | null;
  Dubbing: number | null;
}
