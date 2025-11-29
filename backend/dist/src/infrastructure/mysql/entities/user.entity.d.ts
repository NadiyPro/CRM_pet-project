import { RoleTypeEnum } from './enums/roleType.enum';
import { RefreshTokenEntity } from './refresh-token.entity';
import { CreateUpdateModel } from './models/date.model';
import { OrdersEntity } from './orders.entity';
import { MessageEntity } from './message.entity';
export declare class UserEntity extends CreateUpdateModel {
    id: string;
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;
    role: RoleTypeEnum;
    is_active: boolean;
    deleted: Date | null;
    refreshTokens?: RefreshTokenEntity[] | null;
    orders?: OrdersEntity[] | null;
    messages?: MessageEntity[] | null;
}
