import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString, Length, Matches, Max, Min } from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { CourseEnum } from '../../../../../infrastructure/mySQL/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mySQL/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mySQL/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mySQL/entities/enums/status.enum';

export class BaseStudentsReqDto {
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

  @IsString()
  @Length(2, 5)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  course: CourseEnum | null;

  @IsString()
  @Length(5, 10)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  course_format: CourseFormatEnum | null;

  @IsString()
  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  course_type: CourseTypeEnum | null;

  @IsString()
  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
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
