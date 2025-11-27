import { ListUsersQueryReqDto } from '../req/listUsersQuery.req.dto';
import { UserResDto } from './user.res.dto';
export declare class ListResQueryDto extends ListUsersQueryReqDto {
    users: UserResDto[];
    total: number;
}
