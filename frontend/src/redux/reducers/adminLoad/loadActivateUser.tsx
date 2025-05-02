import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { adminService } from '../../../service/admin.service';

const loadActivateUser = createAsyncThunk(
  'loadActivateUser',
  async (managerId: string, thunkAPI) => {
    try {
      const response = await adminService.activateUser(managerId);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadActivateUser
}