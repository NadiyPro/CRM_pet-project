import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../../infrastructure/repository/services/message.repository';
import { OrdersRepository } from '../../../infrastructure/repository/services/orders.repository';
import { BaseMessageResDto } from '../models/dto/res/baseMessage.res.dto';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { BaseMessageReqDto } from '../models/dto/req/baseMessage.req.dto';
import { StatusEnum } from '../../../infrastructure/mysql/entities/enums/status.enum';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  public async findId(orderId: number): Promise<BaseMessageResDto[]> {
    const messages = await this.messageRepository.findId(orderId);
    return messages.map((message) => {
      return {
        id: message.id,
        messages: message.messages,
        orderId: message.orderId,
        managerId: message.managerId,
        manager: message.manager,
        created_at: message.created_at,
        updated_at: message.updated_at,
      };
    });
  }

  public async createMessage(
    userData: IUserData,
    orderId: number,
    dataMessage: BaseMessageReqDto,
  ): Promise<BaseMessageResDto> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    const mewMessage = this.messageRepository.create({
      messages: dataMessage.messages,
      orderId: order.id,
      managerId: userData.userId,
      manager: userData.surname,
    });
    if (order.status === StatusEnum.NEW || order.status === null) {
      await this.ordersRepository.update(orderId, {
        manager_id: userData,
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
