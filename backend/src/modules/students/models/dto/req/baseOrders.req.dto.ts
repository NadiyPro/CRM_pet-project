import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { CourseEnum } from '../../../../../infrastructure/mysql/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mysql/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mysql/entities/enums/status.enum';

export class BaseOrdersReqDto {
  @IsString()
  @Length(3, 30)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  name: string | null;

  @IsString()
  @Length(3, 30)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  surname: string | null;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Length(0, 20)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string | null;

  @ApiProperty({ example: '+380123456789' })
  @IsString()
  @Length(12)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Matches(
    /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/,
  )
  phone: string | null;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(18)
  @Max(100)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => Number)
  age: number | null;

  @Length(2, 5)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseEnum, {
    message: 'course can be one of: FS, QACX, JCX, JSCX, FE, PCX',
  })
  course: CourseEnum | null;

  @Length(5, 10)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseFormatEnum, {
    message: 'course_format can be one of: static, online',
  })
  course_format: CourseFormatEnum | null;

  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(CourseTypeEnum, {
    message: 'course_type can be one of: pro, minimal, premium, incubator, vip',
  })
  course_type: CourseTypeEnum | null;

  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  @IsEnum(StatusEnum, {
    message: 'status can be one of: In_work, New, Aggre, Disaggre, Dubbing ',
  })
  status: StatusEnum | null;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  @Type(() => Number)
  sum: number | null;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  @Type(() => Number)
  alreadyPaid: number | null;
}
