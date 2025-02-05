import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../../infrastructure/repository/services/message.repository';
import { StudentsRepository } from '../../../infrastructure/repository/services/students.repository';
import { BaseMessageResDto } from '../models/dto/res/baseMessage.res.dto';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { BaseMessageReqDto } from '../models/dto/req/baseMessage.req.dto';
import { StatusEnum } from '../../../infrastructure/mysql/entities/enums/status.enum';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly studentsRepository: StudentsRepository,
  ) {}

  public async findId(studentId: string): Promise<BaseMessageResDto[]> {
    const messages = await this.messageRepository.findId(studentId);
    return messages.map((message) => {
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

  public async createMessage(
    userData: IUserData,
    studentId: string,
    dataMessage: BaseMessageReqDto,
  ): Promise<BaseMessageResDto> {
    const student = await this.studentsRepository.findOneBy({ id: studentId });
    const mewMessage = this.messageRepository.create({
      messages: dataMessage.messages,
      studentId: student.id,
      managerId: userData.userId,
      managerSurname: userData.surname,
    });
    if (student.status === StatusEnum.NEW || student.status === null) {
      await this.studentsRepository.update(studentId, {
        manager: userData,
        status: StatusEnum.IN_WORK,
      });
      return await this.messageRepository.save(mewMessage);
    }
  }

  public async deleteId(messageId: string): Promise<string> {
    await this.messageRepository.delete({ id: messageId });
    return 'The user in the table (db) was successfully deleted';
  }
}
