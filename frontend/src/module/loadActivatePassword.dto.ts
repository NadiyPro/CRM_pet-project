import { AuthPasswordDto } from './authPassword.dto';

export interface LoadActivatePasswordDto {
  refreshToken: string;
  authPasswordDto: AuthPasswordDto;
}