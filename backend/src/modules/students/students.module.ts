import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './service/students.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  // імпортуємо інший модуль з використанням функції forwardRef.
  // forwardRef дозволяє сказати NestJS: "Ми знаємо, що модулі залежать один від одного,
  // але спочатку підключи один з них, а потім повернись до другого".
  // Це розриває циклічну залежність.
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
