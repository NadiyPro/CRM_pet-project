import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';

const loadAllGroup = createAsyncThunk(
  'loadAllGroup',
  async (_, thunkAPI) => {
    try {
      const response = await orderService.allGroup();
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadAllGroup
}