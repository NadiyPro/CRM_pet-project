import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../../infrastructure/repository/services/message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}
}
