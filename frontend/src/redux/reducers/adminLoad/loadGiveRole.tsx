import { createAsyncThunk } from '@reduxjs/toolkit';
import { GiveRoleDto } from '../../../module/giveRole.dto';
import { adminService } from '../../../service/admin.service';
import { AxiosError } from 'axios';
import { adminAction } from '../../slices/adminSlice';

// interface GiveRoleDtoWithId extends GiveRoleDto {
//   id: string;
// }

const loadGiveRole = createAsyncThunk(
  'loadGiveRole',
  async (dtoRole:GiveRoleDto, thunkAPI) => {
    try {
      const response = await adminService.giveRole(dtoRole);
      thunkAPI.dispatch(adminAction.setStatusGiveRole({ text: 'Роль успішно видана (можете активувати користувача)', type: 'success', id: response.id }));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setStatusGiveRole(null));
      }, 10000)
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(adminAction.setStatusGiveRole({ text: 'Будь ласка, перевірте права доступу (доступно тільки для ролі admin)', type: 'error', email: dtoRole.email}));
      setTimeout(() => {
        thunkAPI.dispatch(adminAction.setStatusGiveRole(null));
      }, 10000)
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)

export {
  loadGiveRole
}

// const loadGiveRole = createAsyncThunk(
//   'loadGiveRole',
//   async (dtoRole:GiveRoleDto, thunkAPI) => {
//     try {
//       const response = await adminService.giveRole(dtoRole);
//       thunkAPI.dispatch(adminAction.setStatusGiveRole({ text: 'Роль успішно видана (можете активувати користувача)', type: 'success'}));
//       setTimeout(()=>{
//         thunkAPI.dispatch(adminAction.setStatusGiveRole(null));
//       }, 10000)
//       return thunkAPI.fulfillWithValue(response);
//     } catch (e) {
//       const error = e as AxiosError;
//       thunkAPI.dispatch(adminAction.setStatusGiveRole({ text: 'Будь ласка, перевірте права доступу (доступно тільки для ролі admin)', type: 'error'}));
//       setTimeout(() => {
//         thunkAPI.dispatch(adminAction.setStatusGiveRole(null));
//       }, 10000)
//       return thunkAPI.rejectWithValue(error?.response?.data)
//     }
//   }
// )
//
// export {
//   loadGiveRole
// }