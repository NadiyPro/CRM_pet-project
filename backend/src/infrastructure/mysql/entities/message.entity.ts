import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';
import { OrdersEntity } from './orders.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.MESSAGE)
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  messages: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  created_at: Date | null;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updated_at?: Date | null;

  @Column({ nullable: true })
  orderId: number;
  @ManyToOne(() => OrdersEntity, (student) => student.messages)
  @JoinColumn({ name: 'orderId' })
  order: OrdersEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.messages)
  @JoinColumn({ name: 'manager_id' })
  manager?: UserEntity;
}
