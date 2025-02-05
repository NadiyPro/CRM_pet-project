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

  @Column()
  studentId: string;
  @ManyToOne(() => StudentEntity, (student) => student.messages)
  @JoinColumn({ name: 'student' })
  student: StudentEntity;

  @Column()
  managerId: string;
  @Column()
  managerSurname: string;
  @ManyToOne(() => UserEntity, (entity) => entity.messages)
  @JoinColumn({ name: 'manager' })
  manager?: UserEntity;
}
