import { OrdersStatisticAllDto } from '../../module/admin_dto/ordersStatisticAll.dto';
import { OrdersStatisticManagerDto } from '../../module/admin_dto/ordersStatisticManager.dto';
import { ListUsersQueryDto } from '../../module/admin_dto/listUsersQuery.dto';
import { BaseUsersDto } from '../../module/admin_dto/baseUsers.dto';
import { AuthResDto } from '../../module/auth_dto/authRes.dto';
import { AuthUserDto } from '../../module/auth_dto/authUser.dto';
import { TypeTextDto } from '../../module/typeText.dto';

export interface AdminSliceInterface {
  ordersStatisticAll: OrdersStatisticAllDto,
  ordersStatisticManager: OrdersStatisticManagerDto[],
  dto: ListUsersQueryDto;
  data:{
    users: BaseUsersDto[],
    total: number,
  },
  authTokens: AuthResDto;
  userBanUnban: AuthUserDto;
  giveRoleUser: BaseUsersDto,
  statusGiveRole: TypeTextDto | null;
  isGiveRoleModalOpen: boolean;
  isActivateUser: TypeTextDto | null;
  isBanUser: TypeTextDto | null;
  isUnbanUser: TypeTextDto | null;
}