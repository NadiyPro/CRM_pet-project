import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from '../../mysql/entities/message.entity';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MessageEntity, dataSource.manager);
  }

  public async findId(studentId: string): Promise<MessageEntity[]> {
    return await this.createQueryBuilder('message')
      .leftJoinAndSelect('message.manager', 'manager')
      .leftJoinAndSelect('message.student', 'student')
      .where('student.id = :studentId', { studentId })
      .orderBy('message.created_at', 'DESC')
      .getMany();
  }
}
