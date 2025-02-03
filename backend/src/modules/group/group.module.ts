import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GroupService } from './service/group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  // імпортуємо інший модуль з використанням функції forwardRef.
  // forwardRef дозволяє сказати NestJS: "Ми знаємо, що модулі залежать один від одного,
  // але спочатку підключи один з них, а потім повернись до другого".
  // Це розриває циклічну залежність.
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
