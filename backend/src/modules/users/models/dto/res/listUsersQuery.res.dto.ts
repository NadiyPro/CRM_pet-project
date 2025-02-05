import { ListUsersQueryReqDto } from '../req/listUsersQuery.req.dto';
import { UserResDto } from './user.res.dto';

export class ListResQueryDto extends ListUsersQueryReqDto {
  users: UserResDto[];
  // масив постів
  total: number;
  // кількість постів
}
