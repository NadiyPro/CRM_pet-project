import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';
import { OrdersEntity } from './orders.entity';

@Entity(TableNameEnum.GROUP)
export class GroupEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, unique: true })
  group_name: string | null;

  @OneToMany(() => OrdersEntity, (entity) => entity.group_name, {
    nullable: true,
  })
  orders?: OrdersEntity[] | null;
}
