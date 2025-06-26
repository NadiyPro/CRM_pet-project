import { createAsyncThunk } from '@reduxjs/toolkit';
import { Group_nameDto } from '../../../module/orders_dto/group_name.dto';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';

const loadCreateGroup = createAsyncThunk(
  'loadCreateGroup',
  async (newGroup: Group_nameDto, thunkAPI) => {
    try {
      const response = await orderService.createGroup(newGroup);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadCreateGroup
}