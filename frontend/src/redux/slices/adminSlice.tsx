import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadOrdersStatisticAll } from '../reducers/adminLoad/loadOrdersStatisticAll';
import { OrdersStatisticAllDto } from '../../module/ordersStatisticAll.dto';
import { OrdersStatisticManagerDto } from '../../module/ordersStatisticManager.dto';
import { loadOrdersStatisticManager } from '../reducers/adminLoad/loadOrdersStatisticManager';
import { BaseUsersDto } from '../../module/baseUsers.dto';
import { loadUsersAll } from '../reducers/adminLoad/loadUsersAll';
import { ListUsersQueryDto } from '../../module/listUsersQuery.dto';
import { loadActivateUser } from '../reducers/adminLoad/loadActivateUser';
import { RoleTypeEnum } from '../../module/enums/roleTypeEnum';
import { AuthResDto } from '../../module/authRes.dto';
import { loadBanUser } from '../reducers/adminLoad/loadBanUser';
import { AuthUserDto } from '../../module/authUser.dto';
import { loadUnbanUser } from '../reducers/adminLoad/loadUnbanUser';
import { loadGiveRole } from '../reducers/adminLoad/loadGiveRole';
import { TypeTextDto } from '../../module/typeText.dto';

interface AdminSliceInterface {
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
  statusGiveRole: string;
  isGiveRoleModalOpen: boolean;
  isActivateUser: TypeTextDto | null;
}

const initialState : AdminSliceInterface = {
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
  statusGiveRole: '',
  isGiveRoleModalOpen: false,
  isActivateUser: null
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.dto.page = action.payload;
    },
    setStatusGiveRole(state, action: PayloadAction<string>) {
      state.statusGiveRole = action.payload;
    },
    setOpenGiveRoleModal(state) {
      state.isGiveRoleModalOpen = true;
    },
    setCloseGiveRoleModal(state) {
      state.isGiveRoleModalOpen = false;
    },
    setIsActivateUser(state, action: PayloadAction<TypeTextDto | null>) {
      state.isActivateUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOrdersStatisticAll.fulfilled, (state, action) => {
          state.ordersStatisticAll = action.payload;
        }
      )
      .addCase(loadOrdersStatisticAll.rejected, (state, action) => {
        console.error('Помилка завантаження загальної статистики по заявкам:', action.payload);
      }
      )
      .addCase(
        loadUsersAll.fulfilled, (state, action) => {
          state.data.users = action.payload.users;
          state.data.total = action.payload.total;
        }
      )
      .addCase(loadUsersAll.rejected, (state, action) => {
          console.error('Помилка завантаження списку користувачів:', action.payload);
        }
      )
      .addCase(loadOrdersStatisticManager.fulfilled, (state, action) => {
        state.ordersStatisticManager = action.payload;
      })

      .addCase(loadOrdersStatisticManager.rejected, (state, action) => {
          console.error('Помилка завантаження статистики по менеджеру:', action.payload);
        }
      )
      .addCase(
        loadActivateUser.fulfilled, (state, action) => {
          state.authTokens.tokens.accessToken = action.payload.tokens.accessToken;
          state.authTokens.tokens.refreshToken = action.payload.tokens.refreshToken;
          state.authTokens.user = action.payload.user;
        }
      )
      .addCase(loadActivateUser.rejected, (state, action) => {
          console.error('Помилка активації користувача:', action.payload);
        }
      )
      .addCase(
        loadBanUser.fulfilled, (state, action) => {
          state.userBanUnban = action.payload;
        }
      )
      .addCase(loadBanUser.rejected, (state, action) => {
          console.error('Помилка блокування користувача:', action.payload);
        }
      )
      .addCase(
        loadUnbanUser.fulfilled, (state, action) => {
          state.userBanUnban = action.payload;
        }
      )
      .addCase(loadUnbanUser.rejected, (state, action) => {
          console.error('Помилка розблокування користувача:', action.payload);
        }
      )
      .addCase(
        loadGiveRole.fulfilled, (state, action) => {
          state.giveRoleUser = action.payload;
          state.isGiveRoleModalOpen = false; // закриваю модальне вікно після успішної видачі ролі
        }
      )
      .addCase(loadGiveRole.rejected, (state, action) => {
          console.error('Помилка при видачі ролі новому користувачу:', action.payload);
        }
      )
  }
})

export const adminAction = {
  ...adminSlice.actions,
  loadOrdersStatisticAll,
  loadUsersAll,
  loadOrdersStatisticManager,
  loadActivateUser,
  loadBanUser,
  loadUnbanUser,
  loadGiveRole
}