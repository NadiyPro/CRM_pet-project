import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { RoleTypeEnum } from '../../../infrastructure/mysql/entities/enums/roleType.enum';
import { UserEntity } from '../../../infrastructure/mysql/entities/user.entity';
import { GiveRoleDto } from '../models/dto/req/give_role.dto';

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

  // додати статистику по заявкам з табл студентів
  // public async findAll(
  //   query: ListUsersQueryReqDto,
  // ): Promise<[UserEntity[], number]> {
  //   return await this.userRepository.findAll(query);
  // }
  //
  // додати статистику по заявкам з табл студентів
  // public async ordersStatisticId(
  //   query: ListUsersQueryReqDto,
  // userId: string,
  // ): Promise<статистика> {
  //   return await this.userRepository.findOne(userId, query);
  // }
  //
  // public async deleteId(userId: string): Promise<string> {
  //   await this.userRepository.update({ id: userId }, { deleted: new Date() });
  //   await this.refreshTokenRepository.delete({ user_id: userId });
  //   return 'The user in the table (db) has been successfully marked as deleted';
  // }
}
