import { CreateMessageDto } from './createMessage.dto';

export interface LoadCreateMessageDto {
  orderId: number;
  dataMessage: CreateMessageDto;
}