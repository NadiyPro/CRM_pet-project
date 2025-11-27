import { RoleTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/roleType.enum';
export declare class BaseUserReqDto {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: RoleTypeEnum;
    is_active: boolean;
}
