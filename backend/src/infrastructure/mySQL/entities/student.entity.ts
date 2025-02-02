import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';
import { CourseEnum } from './enums/course.enum';
import { CourseFormatEnum } from './enums/courseFormat.enum';
import { CourseTypeEnum } from './enums/courseType.enum';
import { StatusEnum } from './enums/status.enum';
import { RefreshTokenEntity } from './refresh-token.entity';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';

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

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.student)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  message_id: string;
  @ManyToOne(() => MessageEntity, (entity) => entity.student)
  @JoinColumn({ name: 'message_id' })
  message?: MessageEntity;
}
