import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './service/orders.service';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [forwardRef(() => AuthModule), GroupModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
