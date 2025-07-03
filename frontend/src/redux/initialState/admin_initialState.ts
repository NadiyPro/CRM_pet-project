import { AdminSliceInterface } from '../interface/adminSlice_interface';
import { RoleTypeEnum } from '../../module/enums/roleTypeEnum';

export const initialStateAdmin : AdminSliceInterface = {
  ordersStatisticAll: {
    total: 0,
    In_work: 0,
    New: 0,
    Aggre: 0,
    Disaggre: 0,
    Dubbing: 0,
  },
  ordersStatisticManager: [{
    manager: '',
    total: 0,
    In_work: 0,
    New: 0,
    Aggre: 0,
    Disaggre: 0,
    Dubbing: 0,
  }],
  dto: {
    limit: 10,
    page: 1,
  },
  data:{
    users: [],
    total: 0
  },
  authTokens: {
    tokens: {
      accessToken:	'',
      refreshToken: '',
    },
    user: {
      id: '',
      name: '',
      surname: '',
      email: '',
      is_active: false,
      role: RoleTypeEnum.ADMIN,
    }
  },
  userBanUnban: {
    id: '',
    name: '',
    surname: '',
    email: '',
    is_active: false,
    role: RoleTypeEnum.ADMIN,
  },
  giveRoleUser: {
    id: '',
    name: '',
    surname: '',
    email: '',
    is_active: false,
    role: RoleTypeEnum.MANAGER,
    deleted: null
  },
  statusGiveRole: null,
  isGiveRoleModalOpen: false,
  isActivateUser: null,
  isBanUser: null,
  isUnbanUser: null,
};
