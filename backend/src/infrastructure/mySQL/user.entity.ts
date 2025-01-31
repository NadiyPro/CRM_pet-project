import {
  Column, CreateDateColumn,
  Entity,
  Index, OneToOne,
  // JoinColumn,
  // ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './entities/enums/table-name.enum';

import { RoleTypeEnum } from '../../modules/users/enums/RoleType.enum';

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

  @Column('text', { default: 'admin' , select: false })
  password: string;

  // @Column('text', { unique: true })
  // phone: string;

  @Column({ type: 'enum', default:RoleTypeEnum.ADMIN , enum: RoleTypeEnum })
  role: RoleTypeEnum;

  @Column({ type: 'enum', enum: RoleTypeEnum })
  is_active: RoleTypeEnum;

  @CreateDateColumn()
  last_login:  Date;

  @Column('timestamp', { nullable: true })
  deleted: Date | null;

  // @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  // refreshTokens?: RefreshTokenEntity[] | null;
  //
  // @OneToMany(() => CarsBrandsEntity, (entity) => entity.cars_brands_user)
  // user_cars_brands?: CarsBrandsEntity[] | null;
  //
  // @OneToMany(() => CarsModelsEntity, (entity) => entity.cars_brands_models)
  // user_cars_brands_models?: CarsModelsEntity[] | null;
  //
  // @OneToMany(() => AdvertisementEntity, (entity) => entity.advertisement)
  // user_advertisement?: AdvertisementEntity[] | null;
  //
  // @OneToMany(() => StatisticsEntity, (entity) => entity.statistics)
  // user_statistics?: StatisticsEntity[] | null;
  //
  // @Column('text', { nullable: true })
  // dealership_id?: string;
  // @ManyToOne(() => DealershipEntity, (entity) => entity.users)
  // @JoinColumn({ name: 'dealership_id' })
  // dealership_users?: DealershipEntity | null;
}
