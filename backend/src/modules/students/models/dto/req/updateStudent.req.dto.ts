import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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
]) {
  @IsNotEmpty() // перевіряє, щоб значення поля не було порожнім
  @IsString()
  readonly id: string;
}
