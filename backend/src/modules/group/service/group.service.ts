import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';
import { GroupEntity } from '../../../infrastructure/mySQL/entities/group.entity';
import { ListGroupQueryReqDto } from '../models/dto/req/listGroupQuery.req.dto';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { BaseGroupResDto } from '../models/dto/res/baseGroup.res.dto';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { StudentsRepository } from '../../../infrastructure/repository/services/students.repository';
import { StatusEnum } from '../../../infrastructure/mySQL/entities/enums/status.enum';
import {
  UpdateStatusCheckReqDto,
} from '../../students/models/dto/req/updateStatusСheck.req.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly userRepository: UserRepository,
    private readonly studentsRepository: StudentsRepository,
  ) {}
  public async findAll(query: ListGroupQueryReqDto): Promise<GroupEntity[]> {
    return await this.groupRepository.findAll(query);
  }

  public async create(
    group: string,
    userData: IUserData,
    studentsData: UpdateStatusCheckReqDto,
  ): Promise<BaseGroupResDto> {
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const students = await this.studentsRepository.findOne({
      where: { id: studentsData.id }, // Аналогічно додаємо where для пошуку по id
    });
    if (students.status !== StatusEnum.NEW || students.status !== null) {
      throw new HttpException(
        'The application is in the works of another manager',
        HttpStatus.CONFLICT,
      );
    }

    const new_group = await this.groupRepository.findOneBy({ group: group });
    if (new_group) {
      throw new HttpException('Group already exists', HttpStatus.CONFLICT);
    }
    const createdGroup = await this.groupRepository.save({ group });
    return { id: createdGroup.id, group: createdGroup.group };
  }

  public async deleteId(groupId: string): Promise<string> {
    await this.groupRepository.delete({ id: groupId });
    return 'The user in the table (db) has been successfully marked as deleted';
  }
}
