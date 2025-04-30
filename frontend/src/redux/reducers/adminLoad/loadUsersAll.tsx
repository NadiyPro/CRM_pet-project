import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { adminService } from '../../../service/admin.service';

const loadUsersAll = createAsyncThunk(
  'loadUsersAll',
  async (_, thunkAPI) => {
    try {
      const response = await adminService.usersAll();
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadUsersAll
}