import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from '../../mysql/entities/message.entity';
import { BaseMessageResDto } from '../../../modules/message/models/dto/res/baseMessage.res.dto';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MessageEntity, dataSource.manager);
  }

  public async findAll(): Promise<BaseMessageResDto[]> {
    const qb = this.createQueryBuilder('message')
      .select(['message.id', 'message.messages'])
      .leftJoinAndSelect('message.manager', 'manager')
      .leftJoinAndSelect('message.order', 'order')
      .orderBy('message.created_at', 'DESC');

    return qb.getRawMany();
  }

  public async findId(orderId: number): Promise<MessageEntity[]> {
    const qb = this.createQueryBuilder('message')
      .leftJoinAndSelect('message.manager', 'manager')
      .leftJoinAndSelect('message.order', 'order')
      .where('message.orderId = :orderId', { orderId })
      .orderBy('message.created_at', 'DESC');
    return qb.getMany();
  }
}
