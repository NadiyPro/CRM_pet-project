import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { ApiProperty } from '@nestjs/swagger';
import { SortFieldEnum } from '../../../../enums/sortField.enum';
import { SortASCOrDESCEnum } from '../../../../enums/sortASCOrDESC.enum';
import { BaseOrdersReqDto } from './baseOrders.req.dto';

export class ListOrdersQueryReqDto extends BaseOrdersReqDto {
  @ApiProperty({ default: '25' })
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 25;

  @ApiProperty({ default: '1' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ default: 'created_at', enum: SortFieldEnum })
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(SortFieldEnum)
  @IsOptional()
  sortField?: SortFieldEnum;

  @ApiProperty({ default: 'DESC', enum: SortASCOrDESCEnum })
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @IsEnum(SortASCOrDESCEnum)
  @IsOptional()
  sortASCOrDESC?: SortASCOrDESCEnum;

  @ApiProperty({ default: 'false' })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  me?: boolean = false;
}
