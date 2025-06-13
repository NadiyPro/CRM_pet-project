import { createAsyncThunk } from '@reduxjs/toolkit';
import { GiveRoleDto } from '../../../module/giveRole.dto';
import { adminService } from '../../../service/admin.service';
import { AxiosError } from 'axios';
import { adminAction } from '../../slices/adminSlice';

const loadGiveRole = createAsyncThunk(
  'loadGiveRole',
  async (dtoRole:GiveRoleDto, thunkAPI) => {
    try {
      const response = await adminService.giveRole(dtoRole);
      thunkAPI.dispatch(adminAction.setStatusGiveRole('Роль успішно видана (можете активувати користувача)'));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setStatusGiveRole(''));
      }, 10000)
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(adminAction.setStatusGiveRole('Будь ласка, перевірте права доступу (доступно тільки для ролі admin)'));
      setTimeout(() => {
        thunkAPI.dispatch(adminAction.setStatusGiveRole(''));
      }, 10000)
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)

export {
  loadGiveRole
}