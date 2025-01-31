import { TokenPairResDto } from './token_pair.res.dto';
import { AuthUserResDto } from './auth_user.res.dto';

export class AuthResDto {
  tokens: TokenPairResDto;
  user: AuthUserResDto;
}
