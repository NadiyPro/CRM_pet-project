import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GroupEntity } from '../../mysql/entities/group.entity';
import { BaseGroupResDto } from '../../../modules/group/models/dto/res/baseGroup.res.dto';

@Injectable()
export class GroupRepository extends Repository<GroupEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(GroupEntity, dataSource.manager);
  }
  public async findAll(): Promise<BaseGroupResDto[]> {
    const qb = this.createQueryBuilder('group')
      .select(['group.id', 'group.group_name'])
      .orderBy('group.created_at', 'DESC');

    return qb.getRawMany();
  }
}
