import { UsersService } from './service/users.service';
import { GiveRoleDto } from './models/dto/req/giveRole.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { ListUsersQueryReqDto } from './models/dto/req/listUsersQuery.req.dto';
import { ListResQueryDto } from './models/dto/res/listUsersQuery.res.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    giveRole(giveRoleDto: GiveRoleDto): Promise<UserResDto>;
    findAll(query: ListUsersQueryReqDto): Promise<ListResQueryDto>;
    deleteId(managerId: string): Promise<string>;
}
