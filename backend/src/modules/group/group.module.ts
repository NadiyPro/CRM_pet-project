import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GroupService } from './service/group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
