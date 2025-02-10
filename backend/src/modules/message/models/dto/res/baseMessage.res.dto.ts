import { UserEntity } from '../../../../../infrastructure/mysql/entities/user.entity';

export interface BaseMessageResDto {
  id: number;
  messages: string;
  orderId: number;
  manager: UserEntity;
  created_at: Date;
  updated_at: Date;
}
