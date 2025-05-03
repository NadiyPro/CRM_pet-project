import { AuthPasswordDto } from './authPassword.dto';

export interface LoadActivatePasswordDto {
  token: string;
  authPasswordDto: AuthPasswordDto;
}