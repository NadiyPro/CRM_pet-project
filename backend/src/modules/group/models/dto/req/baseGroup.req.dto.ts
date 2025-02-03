import { IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseGroupReqDto {
  @IsString()
  @Length(3, 20)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  group: string;
}
