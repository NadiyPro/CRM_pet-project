import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';
import { StudentEntity } from './student.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MESSAGE)
export class MessageEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  message: string;

  @OneToMany(() => StudentEntity, (entity) => entity.message)
  student?: StudentEntity[] | null;

  @Column()
  manager: string;
  @ManyToOne(() => UserEntity, (entity) => entity.message)
  @JoinColumn({ name: 'user_id' })
  manager_id?: UserEntity | null;
}
