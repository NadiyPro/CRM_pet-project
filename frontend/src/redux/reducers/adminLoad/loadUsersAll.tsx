import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { adminService } from '../../../service/admin.service';
import { ListUsersQueryDto } from '../../../module/listUsersQuery.dto';

const loadUsersAll = createAsyncThunk(
  'loadUsersAll',
  async (dto: ListUsersQueryDto, thunkAPI) => {
    try {
      const response = await adminService.usersAll(dto);
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