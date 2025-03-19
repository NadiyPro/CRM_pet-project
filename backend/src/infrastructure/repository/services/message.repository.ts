import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from '../../mysql/entities/message.entity';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MessageEntity, dataSource.manager);
  }

  public async findId(orderId: number): Promise<MessageEntity[]> {
    return await this.createQueryBuilder('message')
      // .leftJoinAndSelect('message.manager', 'manager')
      .leftJoin('message.manager', 'manager')
      .leftJoinAndSelect('message.order', 'order')
      .where('order.id = :order', { orderId })
      .addSelect(['manager.id as managerId'])
      .orderBy('message.created_at', 'DESC')
      .getMany();
  }
}
