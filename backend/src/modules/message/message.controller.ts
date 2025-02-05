import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { MessageService } from './service/message.service';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';

@ApiTags(TableNameEnum.MESSAGE)
@Controller(TableNameEnum.MESSAGE)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @ApiOperation({ summary: '', description: '' })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard, StudentOwnershipGuard)
  // @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  // @Get(':studentId')
  // public async findId(
  //   @Param('studentId') studentId: string,
  // ): Promise<BaseMessageResDto[]> {
  //   return await this.messageService.findId(studentId);
  // }
}
