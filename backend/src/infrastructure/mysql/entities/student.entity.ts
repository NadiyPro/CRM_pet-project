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
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';
import { GroupEntity } from './group.entity';

@Index(['name'])
@Entity(TableNameEnum.STUDENT)
export class StudentEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  name: string | null;

  @Column('text', { nullable: true })
  surname: string | null;

  @Column('text', { default: 'admin@gmail.com', unique: true, nullable: true })
  email: string | null;

  @Column('text', { unique: true, nullable: true })
  phone: string | null;

  @Column('integer', { unique: true, nullable: true })
  age: number | null;

  @Column({ type: 'enum', enum: CourseEnum, nullable: true })
  course: CourseEnum;

  @Column({
    type: 'enum',
    enum: CourseFormatEnum,
    nullable: true,
  })
  course_format: CourseFormatEnum | null;

  @Column({ type: 'enum', enum: CourseTypeEnum, nullable: true })
  course_type: CourseTypeEnum | null;

  @Column({ type: 'enum', enum: StatusEnum, nullable: true })
  status: StatusEnum | null;

  @Column('float', { nullable: true })
  sum: number | null;

  @Column('float', { nullable: true })
  alreadyPaid: number | null;

  @Column('timestamp', { nullable: true })
  deleted: Date | null;

  // managerSurname, managerId - тут я буду витягувати юзера який взяв заявку в роботу ПІБ manager та його id
  // manager - по цьому полю вяжу табл, тобто підєдную повністю табл UserEntity до поточної StudentEntity
  @Column({ type: 'uuid', nullable: true })
  managerId: string | null;
  @Column({ nullable: true })
  manager: string | null;
  @ManyToOne(() => UserEntity, (entity) => entity.students)
  @JoinColumn({ name: 'manager_id' })
  manager_id?: UserEntity | null;

  @Column({ type: 'uuid', array: true, nullable: true })
  messagesId: string[] | null;
  @Column('text', { array: true, nullable: true })
  messages: string[] | null;
  @OneToMany(() => MessageEntity, (message) => message.student)
  messages_id?: MessageEntity[];

  @Column({ nullable: true })
  group: string | null;
  @ManyToOne(() => GroupEntity, (entity) => entity.student)
  @JoinColumn({ name: 'group_id' })
  group_id?: GroupEntity;
}
