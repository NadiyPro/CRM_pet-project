import { AuthPasswordDto } from './authPassword.dto';

export interface LoadActivatePasswordDto {
  refresh: string;
  authPasswordDto: AuthPasswordDto;
}