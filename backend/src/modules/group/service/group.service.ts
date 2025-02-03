import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';
import { GroupEntity } from '../../../infrastructure/mySQL/entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    // private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  public async findAll(): Promise<GroupEntity[]> {
    return await this.groupRepository.findAll();
  }
}
