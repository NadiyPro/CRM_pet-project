import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../../infrastructure/repository/services/message.repository';
import { BaseMessageResDto } from '../models/dto/res/baseMessage.res.dto';
import { StudentsRepository } from '../../../infrastructure/repository/services/students.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly studentsRepository: StudentsRepository,
  ) {}

  public async findId(studentId: string): Promise<BaseMessageResDto[]> {
    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
      relations: ['messages', 'messages.manager'],
    });

    if (!student || !student.messages?.length) {
      return [];
    }

    return student.messages.map((item) => ({
      id: item.id,
      message: item.message,
      manager: item.manager ? item.manager.surname : null,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  }
}
