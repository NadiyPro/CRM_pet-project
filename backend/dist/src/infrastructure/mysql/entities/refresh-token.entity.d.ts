import { UserEntity } from './user.entity';
import { CreateUpdateModel } from './models/date.model';
export declare class RefreshTokenEntity extends CreateUpdateModel {
    id: string;
    refreshToken: string;
    exp: Date;
    deviceId?: string | null;
    user_id: string;
    user?: UserEntity;
}
