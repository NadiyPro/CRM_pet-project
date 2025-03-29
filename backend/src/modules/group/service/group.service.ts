import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';
import { ListGroupQueryReqDto } from '../models/dto/req/listGroupQuery.req.dto';
import { BaseGroupResDto } from '../models/dto/res/baseGroup.res.dto';
import { BaseGroupReqDto } from '../models/dto/req/baseGroup.req.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    // private readonly ordersRepository: OrdersRepository,
  ) {}
  public async findAll(
    query?: ListGroupQueryReqDto,
  ): Promise<BaseGroupResDto[]> {
    return await this.groupRepository.findAll(query);
  }

  // public async create(group_name: BaseGroupReqDto): Promise<BaseGroupResDto> {
  //   const exists = await this.groupRepository.existsByName(
  //     group_name.group_name,
  //   );
  //   if (exists) {
  //     throw new HttpException('Group already exists', HttpStatus.CONFLICT);
  //   }
  //
  //   const createdGroup = await this.groupRepository.save({
  //     group_name: group_name.group_name,
  //   });
  //   return { id: createdGroup.id, group_name: createdGroup.group_name };
  // }
  // public async create(groupData: BaseGroupReqDto): Promise<BaseGroupResDto> {
  //   const existingGroup = await this.groupRepository.findOne({
  //     where: { group_name: groupData.group_name },
  //   });
  //
  //   if (existingGroup) {
  //     throw new HttpException('Group already exists', HttpStatus.CONFLICT);
  //   }
  //
  //   return await this.groupRepository.save(
  //     this.groupRepository.create(groupData),
  //   );
  // }
  public async create(group_name: BaseGroupReqDto): Promise<BaseGroupResDto> {
    // Перевіряємо, чи вже існує група з таким ім'ям
    const existingGroup = await this.groupRepository.findOne({
      where: { group_name: group_name.group_name },
    });

    if (existingGroup) {
      throw new HttpException('Group already exists', HttpStatus.CONFLICT);
    }

    // Якщо група не існує, зберігаємо нову групу
    const newGroup = this.groupRepository.create(group_name); // Створюємо новий запис
    const createdGroup = await this.groupRepository.save(newGroup); // Зберігаємо в базу

    // Повертаємо відповідь із створеною групою
    return { id: createdGroup.id, group_name: createdGroup.group_name };
  }

  public async deleteId(groupId: number): Promise<string> {
    await this.groupRepository.delete({ id: groupId });
    return 'The user in the table (db) was successfully deleted';
  }
}
