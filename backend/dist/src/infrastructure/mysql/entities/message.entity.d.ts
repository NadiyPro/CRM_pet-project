import { OrdersEntity } from './orders.entity';
import { UserEntity } from './user.entity';
export declare class MessageEntity {
    id: number;
    messages: string;
    created_at: Date | null;
    updated_at?: Date | null;
    order: OrdersEntity;
    manager?: UserEntity | null;
}
