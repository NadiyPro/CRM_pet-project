import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../../infrastructure/repository/services/message.repository';
import { StudentsRepository } from '../../../infrastructure/repository/services/students.repository';
import { BaseMessageResDto } from '../models/dto/res/baseMessage.res.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly studentsRepository: StudentsRepository,
  ) {}

  public async findId(studentId: string): Promise<BaseMessageResDto[]> {
    const messages = await this.messageRepository.findId(studentId);
    return messages.map((message) => {
      // Перетворення MessageEntity в BaseMessageResDto
      return {
        id: message.id,
        messages: message.messages,
        studentId: message.studentId,
        managerId: message.managerId,
        managerSurname: message.managerSurname,
        created_at: message.created_at,
        updated_at: message.updated_at,
      };
    });
  }
}
