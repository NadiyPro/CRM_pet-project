import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { CreateUpdateModel } from './models/date.model';
import { OrdersEntity } from './orders.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MESSAGE)
export class MessageEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  messages: string;

  @Column({ nullable: true })
  orderId: number;
  @ManyToOne(() => OrdersEntity, (student) => student.messages_id)
  @JoinColumn({ name: 'order' })
  order: OrdersEntity;

  @Column({ type: 'uuid', nullable: true })
  managerId: string | null;
  @Column({ nullable: true })
  manager: string | null;
  @ManyToOne(() => UserEntity, (entity) => entity.messages_id)
  @JoinColumn({ name: 'manager_id' })
  manager_id?: UserEntity;
}
