import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../mySQL/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  //  Клас UserRepository наслідується від класу Repository<UserEntity>,
  //  що дозволяє використовувати стандартні методи репозиторію TypeORM
  //  (як-от find, save, delete, update тощо) для сутності UserEntity
  constructor(private readonly dataSource: DataSource) {
    // інжектується DataSource — клас TypeORM,
    // який надає доступ до менеджера підключення та управління базою даних
    super(UserEntity, dataSource.manager);
    // super() ініціалізує батьківський клас (Repository<UserEntity>) з параметрами:
    // UserEntity — сутність, з якою працює цей репозиторій.
    // dataSource.manager — це менеджер БД ("помічник") від TypeORM, який знає,
    // як спілкуватися з базою даних, і ми використовуємо його для роботи з UserEntity
    // (дозволяє використовувати всі методи create/findAll/findOne/update/remove/delete і т.п)
  }

  // додати статистику по заявкам з табл студентів
  // public async findAll(
  //   query: ListUsersQueryReqDto,
  // ): Promise<[UserEntity[], number]> {
  //   const qb = this.createQueryBuilder('users');
  //   qb.where('users.deleted IS NULL');
  // const limit = query.limit || 10;
  // const page = query.page || 1;
  //
  // qb.take(query.limit);
  // qb.skip((page-1)*limit);
  //
  //   qb.orderBy('created', 'DESC');
  //   return await qb.getManyAndCount();
  // }
}
