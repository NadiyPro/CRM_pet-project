import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';

@Index(['name'])
@Entity(TableNameEnum.STUDENT)
export class StudentEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  Message: string;
}
