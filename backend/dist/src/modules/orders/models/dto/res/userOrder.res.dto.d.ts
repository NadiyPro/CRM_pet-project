import { RoleTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/roleType.enum';
export interface UserOrderResDto {
    id: string;
    name: string | null;
    surname: string | null;
    email: string | null;
    role: RoleTypeEnum;
}
