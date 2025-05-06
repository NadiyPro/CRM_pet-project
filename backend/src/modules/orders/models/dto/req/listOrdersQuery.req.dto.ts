import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { ApiProperty } from '@nestjs/swagger';
import { SortFieldEnum } from '../../../../enums/sortField.enum';
import { SortASCOrDESCEnum } from '../../../../enums/sortASCOrDESC.enum';
import { CourseEnum } from '../../../../../infrastructure/mysql/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mysql/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mysql/entities/enums/status.enum';

export class ListOrdersQueryReqDto {
  @IsString()
  @Length(0, 25)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  name?: string | null;

  @IsString()
  @Length(0, 25)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  surname?: string | null;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Length(0, 100)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email?: string | null;

  @ApiProperty({ example: '380123456789' })
  @IsString()
  @Length(12)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Matches(/^380\d{9}$/)
  phone?: string | null;

  @ApiProperty({ example: 30 })
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(100)
  age?: number | null;

  @Length(2, 10)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseEnum)
  course?: CourseEnum | null;

  @Length(5, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseFormatEnum)
  course_format?: CourseFormatEnum | null;

  @Length(3, 100)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseTypeEnum)
  course_type?: CourseTypeEnum | null;

  @ApiProperty({ example: 100000 })
  @Type(() => Number)
  @IsInt()
  sum?: number | null;

  @ApiProperty({ example: 100000 })
  @Type(() => Number)
  @IsInt()
  alreadyPaid?: number | null;

  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(StatusEnum)
  status?: StatusEnum | null;

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
