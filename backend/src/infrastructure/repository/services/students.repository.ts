import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { StudentEntity } from '../../mysql/entities/student.entity';
import { ListStudentsQueryReqDto } from '../../../modules/students/models/dto/req/list-students-query.req.dto';
import { IUserData } from '../../../modules/auth/models/interfaces/user_data.interface';

@Injectable()
export class StudentsRepository extends Repository<StudentEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StudentEntity, dataSource.manager);
  }
  public async findAll(
    query: ListStudentsQueryReqDto,
  ): Promise<[StudentEntity[], number]> {
    const qb: SelectQueryBuilder<StudentEntity> = this.createQueryBuilder(
      'student',
    )
      .leftJoinAndSelect('student.manager_id', 'manager')
      .leftJoinAndSelect('student.group_id', 'group');
    // .where('student.deleted IS NULL');

    qb.addSelect(['manager.surname', 'group.group']);

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
          manager.surname LIKE :search OR group.group LIKE :search 
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
        'group.group',
      ];
      const column = allowedColumns.includes(query.sortField)
        ? `student.${query.sortField}`
        : 'student.created_at';

      const order =
        query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      qb.orderBy(column, order);
    } else {
      qb.orderBy('student.created_at', 'DESC');
    }

    const limit = query.limit || 25;
    const page = query.page || 1;

    qb.take(query.limit);
    qb.skip((page - 1) * limit);

    return await qb.getManyAndCount();
  }

  public async findMySOrder(
    userData: IUserData,
    query: ListStudentsQueryReqDto,
  ): Promise<[StudentEntity[], number]> {
    const qb: SelectQueryBuilder<StudentEntity> = this.createQueryBuilder(
      'student',
    )
      .leftJoinAndSelect('student.manager_id', 'manager')
      .andWhere('manager.id = :userId', { userId: userData.userId })
      .leftJoinAndSelect('student.group_id', 'group');

    qb.addSelect(['manager.surname', 'group.group']);

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
          manager.surname LIKE :search OR group.group LIKE :search 
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
        'group.group',
      ];
      const column = allowedColumns.includes(query.sortField)
        ? `student.${query.sortField}`
        : 'student.created_at';
      const order =
        query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      qb.orderBy(column, order);

      const limit = query.limit || 25;
      const page = query.page || 1;

      qb.take(query.limit);
      qb.skip((page - 1) * limit);

      return await qb.getManyAndCount();
    }
  }

  public async resetFilters(): Promise<[StudentEntity[], number]> {
    return await this.createQueryBuilder('student')
      .leftJoinAndSelect('student.manager_id', 'manager')
      .leftJoinAndSelect('student.group_id', 'group')
      .addSelect(['manager.surname', 'group.group'])
      .getManyAndCount();
  }
}
