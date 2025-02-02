import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';
import { StudentEntity } from './student.entity';

@Index(['name'])
@Entity(TableNameEnum.STUDENT)
export class MessageEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  Message: string;

  @OneToMany(() => StudentEntity, (entity) => entity.message)
  student?: StudentEntity[] | null;
}
