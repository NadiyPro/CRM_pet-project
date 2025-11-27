import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../mysql/entities/user.entity';
import { ListUsersQueryReqDto } from '../../../modules/users/models/dto/req/listUsersQuery.req.dto';
export declare class UserRepository extends Repository<UserEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(query: ListUsersQueryReqDto): Promise<[UserEntity[], number]>;
}
