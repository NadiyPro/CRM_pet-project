import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { IsBoolean, IsEnum, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortFieldEnum } from '../../../../enums/sortField.enum';
import { SortASCOrDESCEnum } from '../../../../enums/sortASCOrDESC.enum';

export class ListOrdersExportReqDto {
  @Transform(({ value }) => {
    try {
      return JSON.parse(value) as Record<SortFieldEnum, string>;
    } catch {
      return {};
    }
  })
  @IsOptional()
  @IsObject()
  search?: Record<SortFieldEnum, string>;

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
