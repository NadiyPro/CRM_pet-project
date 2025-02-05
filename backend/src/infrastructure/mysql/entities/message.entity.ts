import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';
import { StudentEntity } from './student.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MESSAGE)
export class MessageEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  messages: string;

  @ManyToOne(() => StudentEntity, (student) => student.messages)
  @JoinColumn({ name: 'student_id' })
  student: StudentEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.message)
  @JoinColumn({ name: 'user_id' })
  manager?: UserEntity;
}
