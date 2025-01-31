import {
  Column,
  Entity,
  Index,
  OneToMany,
  // JoinColumn,
  // ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';

import { RoleTypeEnum } from '../../../modules/users/enums/RoleType.enum';
import { RefreshTokenEntity } from './refresh-token.entity';

@Index(['name'])
@Entity(TableNameEnum.USERS) // назва табл в БД
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('text', { default: 'admin@gmail.com', unique: true })
  email: string;

  @Column('text', { default: 'admin', select: false })
  password: string;

  @Column({ type: 'enum', default: RoleTypeEnum.ADMIN, enum: RoleTypeEnum })
  role: RoleTypeEnum;

  @Column('boolean', { default: false })
  is_active: boolean;

  @Column('timestamp', { nullable: true })
  deleted: Date | null;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[] | null;
}
