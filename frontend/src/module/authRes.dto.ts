import { AuthTokenDto } from './authToken.dto';
import { AuthUserDto } from './authUser.dto';

export interface AuthResDto {
  tokens: AuthTokenDto;
  user: AuthUserDto;
}
