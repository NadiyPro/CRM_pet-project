import { PickType } from '@nestjs/swagger';
import { BaseOrdersReqDto } from './baseOrders.req.dto';

export class UpdateOrdersReqDto extends PickType(BaseOrdersReqDto, [
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
