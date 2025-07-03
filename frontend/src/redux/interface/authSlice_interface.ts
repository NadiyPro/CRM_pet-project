import { AuthLoginDto } from '../../module/auth_dto/authLogin.dto';

export interface AuthSliceInterface {
  isValid: boolean;
  isValidPassword: boolean;
  dto: AuthLoginDto;
  loadingLogin: boolean;
  loadingPassword: boolean;
  errorLogin: string | null;
  errorPassword: string | null;
}
