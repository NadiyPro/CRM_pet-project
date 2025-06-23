import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../../infrastructure/repository/services/message.repository';
import { OrdersRepository } from '../../../infrastructure/repository/services/orders.repository';
import { BaseMessageResDto } from '../models/dto/res/baseMessage.res.dto';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { BaseMessageReqDto } from '../models/dto/req/baseMessage.req.dto';
import { StatusEnum } from '../../../infrastructure/mysql/entities/enums/status.enum';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly ordersRepository: OrdersRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<BaseMessageResDto[]> {
    return await this.messageRepository.findAll();
  }

  public async findId(orderId: number): Promise<BaseMessageResDto[]> {
    const messages = await this.messageRepository.findId(orderId);
    return messages.map((message) => {
      return {
        id: message.id,
        messages: message.messages,
        orderId: orderId,
        manager: message.manager?.surname ?? null,
        created_at: message.created_at,
      };
    });
  }

  public async createMessage(
    userData: IUserData,
    orderId: number,
    dataMessage: BaseMessageReqDto,
  ): Promise<BaseMessageResDto> {
    const order = await this.ordersRepository.findOneBy({ id: orderId });
    const manager = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    if (!manager) throw new Error('Manager not found');
    if (!order) throw new Error('Order not found');

    // if (
    //   order.status !== null &&
    //   order.status !== StatusEnum.NEW &&
    //   order.manager &&
    //   order.manager.id !== manager.id
    // ) {
    //   throw new ForbiddenException(
    //     'Order is already in work by another manager',
    //   );
    // }

    const newMessage = this.messageRepository.create({
      messages: dataMessage.messages,
      order: order,
      manager: manager,
    });

    if (order.status !== StatusEnum.NEW && order.status !== null) {
      await this.ordersRepository.update(orderId, {
        manager: manager,
      });
    } else {
      await this.ordersRepository.update(orderId, {
        manager: manager,
        status: StatusEnum.IN_WORK,
      });
    }

    const savedMessage = await this.messageRepository.save(newMessage);

    return {
      id: savedMessage.id,
      messages: savedMessage.messages,
      orderId: orderId,
      manager: savedMessage.manager?.surname ?? null,
      created_at: savedMessage.created_at,
    };
  }

  public async deleteId(messageId: number): Promise<string> {
    await this.messageRepository.delete({ id: messageId });
    return 'The message in the table (db) was successfully deleted';
  }
}
