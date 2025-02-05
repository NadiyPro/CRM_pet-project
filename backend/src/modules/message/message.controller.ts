import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { StudentOwnershipGuard } from '../guards/statuseStudents.guard';
import { Role } from '../guards/decorator/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';

@ApiTags(TableNameEnum.MESSAGE)
@Controller(TableNameEnum.MESSAGE)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: '', description: ''})
@ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, StudentOwnershipGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get()
  public async findAll():Promise<>{}
}
