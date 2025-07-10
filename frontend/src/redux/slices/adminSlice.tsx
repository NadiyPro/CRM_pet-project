import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadOrdersStatisticAll } from '../reducers/adminLoad/loadOrdersStatisticAll';
import { loadOrdersStatisticManager } from '../reducers/adminLoad/loadOrdersStatisticManager';
import { loadUsersAll } from '../reducers/adminLoad/loadUsersAll';
import { loadActivateUser } from '../reducers/adminLoad/loadActivateUser';
import { loadBanUser } from '../reducers/adminLoad/loadBanUser';
import { loadUnbanUser } from '../reducers/adminLoad/loadUnbanUser';
import { loadGiveRole } from '../reducers/adminLoad/loadGiveRole';
import { TypeTextDto } from '../../module/typeText.dto';
import { initialStateAdmin } from '../initialState/admin_initialState';
import { ListUsersQueryDto } from '../../module/admin_dto/listUsersQuery.dto';

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: initialStateAdmin,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.dto.page = action.payload;
    },
    setStatusGiveRole(state, action: PayloadAction<TypeTextDto | null>) {
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
    },
    setIsBanUser(state, action: PayloadAction<TypeTextDto | null>) {
      state.isBanUser = action.payload;
    },
    setIsUnbanUser(state, action: PayloadAction<TypeTextDto | null>) {
      state.isUnbanUser = action.payload;
    },
    setDto(state, action: PayloadAction<Partial<ListUsersQueryDto>>) {
      state.dto = {
        ...state.dto,
        ...action.payload
      };
    },
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
          // state.isGiveRoleModalOpen = false;
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