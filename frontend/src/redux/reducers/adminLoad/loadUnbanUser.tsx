import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from '../../../service/admin.service';
import { AxiosError } from 'axios';

const loadUnbanUser = createAsyncThunk(
  'loadBanUser',
  async (managerId: string, thunkAPI) => {
    try {
      const response = await adminService.unbanUser(managerId);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)

export {
  loadUnbanUser
}