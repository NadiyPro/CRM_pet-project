import { createSlice } from '@reduxjs/toolkit';

interface AuthSliceInterface {
  email: string;
  password: string;
  deviceId: string;
  name: string;
  surname: string;
  is_active: boolean;
  role: string;
};

const initialState: AuthSliceInterface = {
  email: '',
  password: '',
  deviceId: '',
  name: '',
  surname: '',
  is_active: false,
  role: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase()
  }
});

export const authAction = {
  ...authSlice.actions
}