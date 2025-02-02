import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { StudentsService } from './service/students.service';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly usersService: StudentsService) {}
}
