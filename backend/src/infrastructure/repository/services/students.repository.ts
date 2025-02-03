import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { StudentEntity } from '../../mySQL/entities/student.entity';
import { ListStudentsQueryReqDto } from '../../../modules/students/models/dto/req/list-students-query.req.dto';

@Injectable()
export class StudentsRepository extends Repository<StudentEntity> {
  //  Клас UserRepository наслідується від класу Repository<UserEntity>,
  //  що дозволяє використовувати стандартні методи репозиторію TypeORM
  //  (як-от find, save, delete, update тощо) для сутності UserEntity
  constructor(private readonly dataSource: DataSource) {
    // інжектується DataSource — клас TypeORM,
    // який надає доступ до менеджера підключення та управління базою даних
    super(StudentEntity, dataSource.manager);
    // super() ініціалізує батьківський клас (Repository<UserEntity>) з параметрами:
    // UserEntity — сутність, з якою працює цей репозиторій.
    // dataSource.manager — це менеджер БД ("помічник") від TypeORM, який знає,
    // як спілкуватися з базою даних, і ми використовуємо його для роботи з UserEntity
    // (дозволяє використовувати всі методи create/findAll/findOne/update/remove/delete і т.п)
  }
  public async findAll(
    query: ListStudentsQueryReqDto,
  ): Promise<[StudentEntity[], number]> {
    const qb: SelectQueryBuilder<StudentEntity> = this.createQueryBuilder(
      'student',
    )
      .leftJoinAndSelect('student.manager_id', 'manager')
      // зєднуємо по назві звязу manager_id?: UserEntity;
      .leftJoinAndSelect('student.message', 'message')
      .where('student.deleted IS NULL');

    // **Пошук по всьому полю (повний збіг)**
    if (query.search) {
      qb.andWhere(
        `(
         student.id LIKE :search OR
          student.name LIKE :search OR
          student.surname LIKE :search OR
          student.email LIKE :search OR
          student.phone LIKE :search OR
          CAST(student.age AS CHAR) LIKE :search OR
          student.course LIKE :search OR
          student.course_format LIKE :search OR
          student.course_type LIKE :search OR
          student.status LIKE :search OR
          CAST(student.sum AS CHAR) LIKE :search OR
          CAST(student.alreadyPaid AS CHAR) LIKE :search OR
          manager.surname LIKE :search
        )`,
        { search: `%${query.search}%` },
      );
    }

    if (query.sortField && query.sortASCOrDESC) {
      const allowedColumns = [
        'id',
        'name',
        'surname',
        'email',
        'phone',
        'age',
        'course',
        'course_format',
        'course_type',
        'status',
        'sum',
        'alreadyPaid',
        'created_at',
        'manager.surname',
      ];
      const column = allowedColumns.includes(query.sortField)
        ? `student.${query.sortField}`
        : 'student.created_at';
      // перевіряємо чи входить поле для сортування у список sortField,
      // якщо ні, то за замовченням сортуємо по даті
      const order =
        query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      qb.orderBy(column, order); //  додає ORDER BY у SQL-запит
    } else {
      qb.orderBy('student.created_at', 'DESC');
      // якщо sortField і sortASCOrDESC не передані,
      // то сортування йде за student.created_at у порядку спадання (DESC).
    }

    const limit = query.limit || 25;
    const page = query.page || 1;

    qb.take(query.limit);
    qb.skip((page - 1) * limit);

    return await qb.getManyAndCount();
  }
}
