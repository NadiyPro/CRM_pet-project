import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/tableName.enum';
import { UserEntity } from './user.entity';
import { CreateUpdateModel } from './models/date.model';

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokenEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  refreshToken: string;

  @Column({ type: 'datetime', nullable: true })
  exp: Date;

  @Column('text', { nullable: true })
  deviceId?: string | null;

  @Column({ type: 'uuid' })
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
