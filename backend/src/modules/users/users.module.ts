import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../infrastructure/mysql/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  // імпортуємо інший модуль з використанням функції forwardRef.
  // forwardRef дозволяє сказати NestJS: "Ми знаємо, що модулі залежать один від одного,
  // але спочатку підключи один з них, а потім повернись до другого".
  // Це розриває циклічну залежність.
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
