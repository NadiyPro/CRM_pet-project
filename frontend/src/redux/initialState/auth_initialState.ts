import { AuthSliceInterface } from '../interface/authSlice_interface';

export const initialStateAuth: AuthSliceInterface = {
  isValid: false,
  isValidPassword: false,
  dto:{
    email: '',
    password: '',
    deviceId: '',
  },
  loadingLogin: false,
  loadingPassword: false,
  errorLogin: null,
  errorPassword: null
};