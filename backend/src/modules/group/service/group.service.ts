import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';
import { GroupEntity } from '../../../infrastructure/mysql/entities/group.entity';
import { ListGroupQueryReqDto } from '../models/dto/req/listGroupQuery.req.dto';
import { BaseGroupResDto } from '../models/dto/res/baseGroup.res.dto';
import { BaseGroupReqDto } from '../models/dto/req/baseGroup.req.dto';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}
  public async findAll(query: ListGroupQueryReqDto): Promise<GroupEntity[]> {
    return await this.groupRepository.findAll(query);
  }

  public async create(group_name: BaseGroupReqDto): Promise<BaseGroupResDto> {
    let new_group = await this.groupRepository.findOneBy({
      group_name: group_name.group_name,
    });
    if (new_group) {
      throw new HttpException('Group already exists', HttpStatus.CONFLICT);
    }
    const createdGroup = await this.groupRepository.save({
      group_name: group_name.group_name,
    });
    new_group = await this.groupRepository.findOneBy({ id: createdGroup.id });
    return new_group;
  }

  public async deleteId(groupId: number): Promise<string> {
    await this.groupRepository.delete({ id: groupId });
    return 'The user in the table (db) was successfully deleted';
  }
}
