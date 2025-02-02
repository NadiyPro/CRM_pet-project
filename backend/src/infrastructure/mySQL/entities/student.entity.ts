import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';
import { CourseEnum } from './enums/course.enum';
import { CourseFormatEnum } from './enums/courseFormat.enum';
import { CourseTypeEnum } from './enums/courseType.enum';
import { StatusEnum } from './enums/status.enum';

@Index(['name'])
@Entity(TableNameEnum.STUDENT)
export class StudentEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  surname: string;

  @Column('text', { default: 'admin@gmail.com', unique: true })
  email: string;

  @Column('text', { unique: true, nullable: true })
  phone: string;

  @Column('integer', { unique: true, nullable: true })
  age: number;

  @Column({ type: 'enum', enum: CourseEnum, unique: true, nullable: true })
  course: CourseEnum;

  @Column({
    type: 'enum',
    enum: CourseFormatEnum,
    unique: true,
    nullable: true,
  })
  course_format: CourseFormatEnum;

  @Column({ type: 'enum', enum: CourseTypeEnum, unique: true, nullable: true })
  course_type: CourseTypeEnum;

  @Column({ type: 'enum', enum: StatusEnum, unique: true, nullable: true })
  status: StatusEnum;

  @Column('float', { nullable: true })
  sum: number;

  @Column('float', { nullable: true })
  alreadyPaid: number;

  @Column('timestamp', { nullable: true })
  deleted: Date | null;

  // cвязать с таб юзеров
  // @Column({ type: 'enum', default: RoleTypeEnum.ADMIN, enum: RoleTypeEnum })
  // role: RoleTypeEnum;
}
