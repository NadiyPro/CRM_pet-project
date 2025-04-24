import { createSlice } from '@reduxjs/toolkit';
import { loadLogin } from '../reducers/authLoad/loadLogin';
import { AuthLoginModule } from '../../module/authLoginModule';
import { loadLogOut } from '../reducers/authLoad/loadLogOut';

interface AuthSliceInterface {
  isValid: boolean;
  dto: AuthLoginModule
}

const initialState: AuthSliceInterface = {
  isValid: false,
  dto:{
    email: '',
    password: '',
    deviceId: '',
  }
};

// interface AuthSliceInterface {
//   email: string;
//   password: string;
//   deviceId: string;
//   name: string;
//   surname: string;
//   is_active: boolean;
//   role: string;
// }
//
// const initialState: AuthSliceInterface = {
//   email: '',
//   password: '',
//   deviceId: '',
//   name: '',
//   surname: '',
//   is_active: false,
//   role: '',
// };

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {},
  extraReducers:  (builder) => {
    builder
      .addCase(
        loadLogin.fulfilled, (state, action) => {
          state.isValid = action.payload;
    })
      .addCase(
        loadLogOut.fulfilled, (state) => {
          state.isValid = false;
        })
  }
});

export const authAction = {
  ...authSlice.actions,
  loadLogin,
  loadLogOut
}