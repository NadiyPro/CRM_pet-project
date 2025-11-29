import { MessageService } from './service/message.service';
import { BaseMessageResDto } from './models/dto/res/baseMessage.res.dto';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { BaseMessageReqDto } from './models/dto/req/baseMessage.req.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    findAll(): Promise<BaseMessageResDto[]>;
    findId(orderId: number): Promise<BaseMessageResDto[]>;
    createMessage(userData: IUserData, orderId: number, dataMessage: BaseMessageReqDto): Promise<BaseMessageResDto>;
    deleteId(messageId: number): Promise<string>;
}
