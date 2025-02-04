import { UserEntity } from '../../../infrastructure/mysql/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interfaces/jwt_payload.interface';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { ListUsersQueryReqDto } from '../models/dto/req/list-users-query.req.dto';
import { ListResQueryDto } from '../models/dto/res/list-users-query.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      deleted: user.deleted,
    };
  }

  public static toIUserData(
    user: UserEntity,
    jwtPayload: IJwtPayload,
  ): IUserData {
    return {
      userId: user.id,
      surname: user.surname,
      name: user.name,
      deviceId: jwtPayload.deviceId,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      deleted: user.deleted,
    };
  }

  public static toAllResDtoList(
    users: UserEntity[],
    total: number,
    query: ListUsersQueryReqDto,
  ): ListResQueryDto {
    return { users: users.map((user) => this.toResDto(user)), total, ...query };
  }
  // кількість юзерів, поля query передані в моделі (limit, page)
}
