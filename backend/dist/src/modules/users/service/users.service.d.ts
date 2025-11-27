import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { UserEntity } from '../../../infrastructure/mysql/entities/user.entity';
import { GiveRoleDto } from '../models/dto/req/giveRole.dto';
import { ListUsersQueryReqDto } from '../models/dto/req/listUsersQuery.req.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly refreshTokenRepository;
    constructor(userRepository: UserRepository, refreshTokenRepository: RefreshTokenRepository);
    giveRole(giveRoleDto: GiveRoleDto): Promise<UserEntity>;
    findAll(query: ListUsersQueryReqDto): Promise<[UserEntity[], number]>;
    deleteId(managerId: string): Promise<string>;
}
