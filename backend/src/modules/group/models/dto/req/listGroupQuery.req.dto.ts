import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class ListGroupQueryReqDto {
  @Transform(({ value }) =>
    TransformHelper.toLowerCase({ value: value as string }),
  )
  @IsString()
  @IsOptional()
  search?: string;
}
