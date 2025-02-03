import { PickType } from '@nestjs/swagger';
import { BaseStudentsReqDto } from './base_students.req.dto';

export class UpdateStudentReqDto extends PickType(BaseStudentsReqDto, [
  'name',
  'surname',
  'email',
  'phone',
  'age',
  'course',
  'course_format',
  'course_type',
  'status',
  'sum',
  'alreadyPaid',
]) {}
