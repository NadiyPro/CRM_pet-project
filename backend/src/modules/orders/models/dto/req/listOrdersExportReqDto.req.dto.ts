import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortFieldEnum } from '../../../../enums/sortField.enum';
import { SortASCOrDESCEnum } from '../../../../enums/sortASCOrDESC.enum';

export class ListOrdersExportReqDto {
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(SortFieldEnum)
  @IsOptional()
  searchField?: SortFieldEnum | null;

  @Transform(({ value }) =>
    TransformHelper.toLowerCase({ value: value as string }),
  )
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ default: 'created_at', enum: SortFieldEnum })
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(SortFieldEnum)
  @IsOptional()
  sortField?: SortFieldEnum | null;

  @ApiProperty({ default: 'DESC', enum: SortASCOrDESCEnum })
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @IsEnum(SortASCOrDESCEnum)
  @IsOptional()
  sortASCOrDESC?: SortASCOrDESCEnum | null;

  @ApiProperty({ default: 'false' })
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  @IsOptional()
  me?: boolean = false;
}
