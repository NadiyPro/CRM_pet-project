import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { SortFieldEnum } from '../../../../enums/sortField.enum';
import { SortASCOrDESCEnum } from '../../../../enums/sortASCOrDESC.enum';
import { CourseEnum } from '../../../../../infrastructure/mysql/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mysql/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mysql/entities/enums/status.enum';

export class ListOrdersQueryReqDto {
  @IsOptional()
  @IsString()
  @Length(0, 25)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  name?: string | null;

  @IsOptional()
  @IsString()
  @Length(0, 25)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  surname?: string | null;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  email?: string | null;

  @IsOptional()
  @IsString()
  @Length(3, 12)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  phone?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(100)
  age?: number | null;

  @IsOptional()
  @Length(2, 10)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseEnum)
  course?: CourseEnum | null;

  @IsOptional()
  @Length(5, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseFormatEnum)
  course_format?: CourseFormatEnum | null;

  @IsOptional()
  @Length(3, 100)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseTypeEnum)
  course_type?: CourseTypeEnum | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sum?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  alreadyPaid?: number | null;

  @IsOptional()
  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(StatusEnum)
  status?: StatusEnum | null;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  group_name?: string | null;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  manager?: string | null;

  // @IsOptional()
  // @IsString()
  // @Matches(/^\d{2}\.\d{2}\.\d{4}$/, {
  //   message: 'created_at_from повинен бути в форматі DD.MM.YYYY',
  // })
  // created_at_from?: string | null;
  //
  // @IsOptional()
  // @IsString()
  // @Matches(/^\d{2}\.\d{2}\.\d{4}$/, {
  //   message: 'created_at_to повинен бути в форматі DD.MM.YYYY',
  // })
  // created_at_to?: string | null;

  @IsOptional()
  @IsString()
  @IsDateString(
    {},
    { message: 'created_at_from повинен бути в форматі YYYY-MM-DD' },
  )
  created_at_from?: string | null;

  @IsOptional()
  @IsString()
  @IsDateString(
    {},
    { message: 'created_at_to повинен бути в форматі YYYY-MM-DD' },
  )
  created_at_to?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  limit?: number = 25;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(SortFieldEnum)
  sortField?: SortFieldEnum;

  @IsOptional()
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @IsEnum(SortASCOrDESCEnum)
  sortASCOrDESC?: SortASCOrDESCEnum;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  my?: boolean = false;
}
