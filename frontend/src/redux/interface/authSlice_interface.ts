import { AuthLoginDto } from '../../module/auth_dto/authLogin.dto';

export interface AuthSliceInterface {
  isValid: boolean | null;
  isValidPassword: boolean | null;
  dto: AuthLoginDto;
  loadingLogin: boolean;
  loadingPassword: boolean;
  errorLogin: string | null;
  errorPassword: string | null;
  isValidRefresh: boolean | null;
  loadingRefresh: boolean | null;
}
