import { UserEntity } from '../../../infrastructure/mysql/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt_payload.interface';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { ListUsersQueryReqDto } from '../models/dto/req/listUsersQuery.req.dto';
import { ListResQueryDto } from '../models/dto/res/listUsersQuery.res.dto';
export declare class UserMapper {
    static toResDto(user: UserEntity): UserResDto;
    static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): IUserData;
    static toAllResDtoList(users: UserEntity[], total: number, query: ListUsersQueryReqDto): ListResQueryDto;
}
