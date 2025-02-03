import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseStudentsReqDto } from './base_students.req.dto';

export class UpdateStatusCheckReqDto extends PickType(BaseStudentsReqDto, [
  'status',
]) {
  @IsNotEmpty() // перевіряє, щоб значення поля не було порожнім
  @IsString()
  readonly id: string;
}
