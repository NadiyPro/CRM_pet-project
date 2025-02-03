import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { GroupService } from './service/group.service';

@ApiTags('students')
@Controller('students')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
}
