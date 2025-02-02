import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';

import { CreateUpdateModel } from './models/date.model';

@Index(['name'])
@Entity(TableNameEnum.USERS) // назва табл в БД
export class StudentEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('text', { default: 'admin@gmail.com', unique: true })
  email: string;

  @Column('text', { unique: true })
  phone: string;

  @Column('integer', { unique: true })
  age: number;

  @Column('text', { unique: true })
  course: string;

  @Column('text', { unique: true })
  course_format: string;

  @Column('text', { unique: true })
  course_type: string;

  @Column('text', { unique: true })
  status: string;

  @Column('float', { nullable: false })
  sum: number;

  @Column('float', { nullable: false })
  alreadyPaid: number;

  @Column('timestamp', { nullable: true })
  deleted: Date | null;

  // cвязать с таб юзеров
  // @Column({ type: 'enum', default: RoleTypeEnum.ADMIN, enum: RoleTypeEnum })
  // role: RoleTypeEnum;
}
