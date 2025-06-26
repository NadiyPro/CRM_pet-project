import { AuthPasswordDto } from '../auth_dto/authPassword.dto';

export interface LoadActivatePasswordDto {
  token: string;
  authPasswordDto: AuthPasswordDto;
}