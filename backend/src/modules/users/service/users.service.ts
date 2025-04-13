import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { RoleTypeEnum } from '../../../infrastructure/mysql/entities/enums/roleType.enum';
import { UserEntity } from '../../../infrastructure/mysql/entities/user.entity';
import { GiveRoleDto } from '../models/dto/req/giveRole.dto';
import { ListUsersQueryReqDto } from '../models/dto/req/listUsersQuery.req.dto';

@Injectable()
export class UsersService {
  constructor(
    // private readonly configService: ConfigService<Config>,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async giveRole(giveRoleDto: GiveRoleDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...giveRoleDto,
      role: RoleTypeEnum.MANAGER,
      is_active: false,
    });
    return await this.userRepository.save(user);
  }

  public async findAll(
    query: ListUsersQueryReqDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.findAll(query);
  }

  public async deleteId(managerId: string): Promise<string> {
    await this.userRepository.update(
      { id: managerId },
      { deleted: new Date() },
    );
    await this.refreshTokenRepository.delete({ user_id: managerId });
    return 'The user in the table (db) has been successfully marked as deleted';
  }
}
