import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './service/message.service';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { OrdersGuard } from '../guards/statuseOrders.guard';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { Role } from '../guards/decorator/role.decorator';
import { BaseMessageResDto } from './models/dto/res/baseMessage.res.dto';
import { CurrentUser } from '../auth/decorators/current_user.decorator';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { BaseMessageReqDto } from './models/dto/req/baseMessage.req.dto';

@ApiTags(TableNameEnum.MESSAGE)
@Controller(TableNameEnum.MESSAGE)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({
    summary:
      'Admin | manager може переглядати всі коментарі, ' +
      'які відносяться до кокретного студента за його studentId',
    description:
      'Admin | manager може переглядати всі коментарі, ' +
      'які відносяться до кокретного студента за його studentId',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get(':orderId')
  public async findId(
    @Param('orderId') orderId: number,
  ): Promise<BaseMessageResDto[]> {
    return await this.messageService.findId(orderId);
  }

  @ApiOperation({
    summary: 'Admin | manager може створити коменнтар.',
    description:
      'Admin | manager може створити коменнтар, ' +
      'якщо до цього status === New, або status === null,' +
      'то буде автоматично змінено status на In_Work та підтягнеться Призвіще менеджера.' +
      '(якщо заявка status ==== New або null або знаходиться в роботі у даного admin | manager)',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, OrdersGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Post(':orderId')
  public async createMessage(
    @CurrentUser() userData: IUserData,
    @Param('orderId') orderId: number,
    @Body() dataMessage: BaseMessageReqDto,
  ): Promise<BaseMessageResDto> {
    return await this.messageService.createMessage(
      userData,
      orderId,
      dataMessage,
    );
  }

  @ApiOperation({
    summary: 'Для видалення запису про message за його messageId',
    description: 'Admin може видалити запис про message по його messageId ',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Delete(':messageId')
  public async deleteId(
    @Param('messageId', ParseUUIDPipe) messageId: string,
  ): Promise<string> {
    return await this.messageService.deleteId(messageId);
  }
}
