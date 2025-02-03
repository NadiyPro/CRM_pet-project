import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    // private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
}
