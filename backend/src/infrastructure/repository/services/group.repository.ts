import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GroupEntity } from '../../mysql/entities/group.entity';
import { ListGroupQueryReqDto } from '../../../modules/group/models/dto/req/listGroupQuery.req.dto';
import { BaseGroupResDto } from '../../../modules/group/models/dto/res/baseGroup.res.dto';

@Injectable()
export class GroupRepository extends Repository<GroupEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(GroupEntity, dataSource.manager);
  }
  public async findAll(
    query?: ListGroupQueryReqDto,
  ): Promise<BaseGroupResDto[]> {
    const qb = this.createQueryBuilder('group')
      .select(['group.id', 'group.group_name'])
      .orderBy('group.created_at', 'DESC');

    if (query.search) {
      qb.andWhere('LOWER(group.group_name) LIKE :search', {
        search: `%${query.search.toLowerCase()}%`,
      });
    }

    return qb.getRawMany();
  }
}
