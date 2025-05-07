import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';
import { BaseGroupResDto } from '../models/dto/res/baseGroup.res.dto';
import { BaseGroupReqDto } from '../models/dto/req/baseGroup.req.dto';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}
  public async findAll(): Promise<BaseGroupResDto[]> {
    return await this.groupRepository.findAll();
  }

  public async create(group_name: BaseGroupReqDto): Promise<BaseGroupResDto> {
    const existingGroup = await this.groupRepository.findOne({
      where: { group_name: group_name.group_name },
    });

    if (existingGroup) {
      throw new HttpException('Group already exists', HttpStatus.CONFLICT);
    }

    const newGroup = this.groupRepository.create(group_name);
    const createdGroup = await this.groupRepository.save(newGroup);

    return { id: createdGroup.id, group_name: createdGroup.group_name };
  }

  public async deleteId(groupId: number): Promise<string> {
    await this.groupRepository.delete({ id: groupId });
    return 'The group in the table (db) was successfully deleted';
  }
}
