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

interface AdminSliceInterface {
  ordersStatisticAll: OrdersStatisticAllDto,
  ordersStatisticManager: OrdersStatisticManagerDto,
  dto: ListUsersQueryDto;
  data:{
    users: BaseUsersDto[],
    total: number,
  },
  authTokens: AuthResDto;
}

const initialState : AdminSliceInterface = {
  ordersStatisticAll: {
    total: null,
    In_work: null,
    New: null,
    Aggre: null,
    Disaggre: null,
    Dubbing: null,
  },
  ordersStatisticManager: {
    manager: null,
    total: null,
    In_work: null,
    New: null,
    Aggre: null,
    Disaggre: null,
    Dubbing: null,
  },
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
      access:	'',
      refresh: '',
    },
    user: {
      id: '',
      name: '',
      surname: '',
      email: '',
      is_active: false,
      role: RoleTypeEnum.ADMIN,
    }
  }
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.dto.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOrdersStatisticAll.fulfilled, (state, action) => {
          state.ordersStatisticAll = action.payload;
        }
      )
      .addCase(
        loadUsersAll.fulfilled, (state, action) => {
          state.data.users = action.payload.users;
          state.data.total = action.payload.total;
        }
      )
      .addCase(
        loadOrdersStatisticManager.fulfilled, (state, action) => {
          state.ordersStatisticManager = action.payload;
        }
      )
      .addCase(
        loadActivateUser.fulfilled, (state, action) => {
          state.authTokens.tokens.access = action.payload.tokens.access;
          state.authTokens.tokens.refresh = action.payload.tokens.refresh;
          state.authTokens.user = action.payload.user;
        }
      )
  }
})

export const adminAction = {
  ...adminSlice.actions,
  loadOrdersStatisticAll,
  loadUsersAll,
  loadOrdersStatisticManager,
  loadActivateUser
}