import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';
import { StudentEntity } from './student.entity';

@Entity(TableNameEnum.GROUP)
export class GroupEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true, unique: true })
  group: string;

  @OneToMany(() => StudentEntity, (entity) => entity.group_id)
  student?: StudentEntity[];
}
