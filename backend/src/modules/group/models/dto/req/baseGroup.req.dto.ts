import { IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { ApiProperty } from '@nestjs/swagger';

export class BaseGroupReqDto {
  @ApiProperty({ example: 'march_2024' })
  @IsString()
  @Length(3, 20)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  group_name: string;
}
