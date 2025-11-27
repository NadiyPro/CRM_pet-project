import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from '../../mysql/entities/message.entity';
import { BaseMessageResDto } from '../../../modules/message/models/dto/res/baseMessage.res.dto';
export declare class MessageRepository extends Repository<MessageEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(): Promise<BaseMessageResDto[]>;
    findId(orderId: number): Promise<MessageEntity[]>;
}
