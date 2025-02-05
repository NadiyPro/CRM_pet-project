import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { StudentOwnershipGuard } from '../guards/statuseStudents.guard';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { Role } from '../guards/decorator/role.decorator';
import { BaseMessageResDto } from './models/dto/res/baseMessage.res.dto';

@ApiTags(TableNameEnum.MESSAGE)
@Controller(TableNameEnum.MESSAGE)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Admin | manager може переглядати всі коментарі, ' +
      'які відносяться до кокретного студента за його studentId',
    description: 'Admin | manager може переглядати всі коментарі, ' +
      'які відносяться до кокретного студента за його studentId' })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get(':studentId')
  public async findId(
    @Param('studentId') studentId: string,
  ): Promise<BaseMessageResDto[]> {
    return await this.messageService.findId(studentId);
  }


}
