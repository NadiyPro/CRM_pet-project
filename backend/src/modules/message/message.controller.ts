import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { MessageService } from './service/message.service';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
}
