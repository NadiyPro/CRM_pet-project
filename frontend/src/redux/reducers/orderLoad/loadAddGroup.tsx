import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoadAddGroupDto } from '../../../module/loadAddGroup.dto';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';

const loadAddGroup = createAsyncThunk(
  'loadAddGroup',
  async ({orderId, group_id}: LoadAddGroupDto, thunkAPI) => {
    console.log("loadAddGroup:", orderId, group_id);
    try {
      const response = await orderService.addGroup(orderId, group_id);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadAddGroup
}