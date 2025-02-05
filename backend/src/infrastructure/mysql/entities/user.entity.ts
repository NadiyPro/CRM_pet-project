import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/tableName.enum';

import { RoleTypeEnum } from './enums/roleType.enum';
import { RefreshTokenEntity } from './refresh-token.entity';
import { CreateUpdateModel } from './models/date.model';
import { StudentEntity } from './student.entity';
import { MessageEntity } from './message.entity';

@Index(['name'])
@Entity(TableNameEnum.USERS) // назва табл в БД
export class UserEntity extends CreateUpdateModel {
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

  @OneToMany(() => StudentEntity, (entity) => entity.manager)
  students?: StudentEntity[] | null;

  @OneToMany(() => MessageEntity, (entity) => entity.manager)
  messages?: MessageEntity[];
}
