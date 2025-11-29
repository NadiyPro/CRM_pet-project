import { MessageRepository } from '../../../infrastructure/repository/services/message.repository';
import { OrdersRepository } from '../../../infrastructure/repository/services/orders.repository';
import { BaseMessageResDto } from '../models/dto/res/baseMessage.res.dto';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { BaseMessageReqDto } from '../models/dto/req/baseMessage.req.dto';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
export declare class MessageService {
    private readonly messageRepository;
    private readonly ordersRepository;
    private readonly userRepository;
    constructor(messageRepository: MessageRepository, ordersRepository: OrdersRepository, userRepository: UserRepository);
    findAll(): Promise<BaseMessageResDto[]>;
    findId(orderId: number): Promise<BaseMessageResDto[]>;
    createMessage(userData: IUserData, orderId: number, dataMessage: BaseMessageReqDto): Promise<BaseMessageResDto>;
    deleteId(messageId: number): Promise<string>;
}
