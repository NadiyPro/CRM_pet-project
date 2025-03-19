import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GroupEntity } from '../../mysql/entities/group.entity';
import { ListGroupQueryReqDto } from '../../../modules/group/models/dto/req/listGroupQuery.req.dto';

@Injectable()
export class GroupRepository extends Repository<GroupEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(GroupEntity, dataSource.manager);
  }

  public async findAll(query: ListGroupQueryReqDto): Promise<GroupEntity[]> {
    const qb = this.createQueryBuilder('group');
    if (query.search) {
      qb.andWhere(
        `(
         group.group LIKE :search
        )`,
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy('group.created_at', 'DESC');
    return await qb.getMany();
  }
}
