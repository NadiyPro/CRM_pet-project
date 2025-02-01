import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { RoleTypeEnum } from '../enums/RoleType.enum';
import { UserEntity } from '../../../infrastructure/mySQL/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    // private readonly configService: ConfigService<Config>,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async giveRole(
    user_id: string,
    new_role: RoleTypeEnum,
    role: RoleTypeEnum,
    is_active: boolean,
  ): Promise<UserEntity> {
    if (role === RoleTypeEnum.ADMIN && is_active === true) {
      const user = await this.userRepository.giveRole(user_id, new_role);
      return await this.userRepository.save(user);
    } else {
      throw new Error('Permission denied');
    }
    // додати формування access 30 хв та відправку його на пошту новому user
  }

  // public async findAll(
  //   query: ListUsersQueryReqDto,
  // ): Promise<[UserEntity[], number]> {
  //   return await this.userRepository.findAll(query);
  // }
  //
  // public async OrdersStatistic(
  // ): Promise<StudentEntity> {
  //   return await this.studentRepository.findStatus(query);
  // }
  //
  // public async deleteId(userId: string): Promise<string> {
  //   await this.userRepository.update({ id: userId }, { deleted: new Date() });
  //   await this.refreshTokenRepository.delete({ user_id: userId });
  //   return 'The user in the table (db) has been successfully marked as deleted';
  // }
}
