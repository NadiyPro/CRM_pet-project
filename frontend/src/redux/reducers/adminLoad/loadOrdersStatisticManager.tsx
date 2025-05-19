import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from '../../../service/admin.service';
import { AxiosError } from 'axios';

const loadOrdersStatisticManager = createAsyncThunk(
  'ordersStatisticManager',
  async (_, thunkAPI)=> {
    try {
      const response =  await adminService.ordersStatisticManager();
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadOrdersStatisticManager
}