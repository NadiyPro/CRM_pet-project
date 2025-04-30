import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { adminService } from '../../../service/admin.service';

const loadOrdersStatisticAll = createAsyncThunk(
  'ordersStatisticAll',
  async (_, thunk)=> {
    try {
      const response = await adminService.ordersStatisticAll();
      return thunk.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunk.rejectWithValue(error?.response?.data)
    }
}
)
export {
  loadOrdersStatisticAll
}