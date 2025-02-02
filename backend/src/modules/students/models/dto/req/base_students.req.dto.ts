import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString, Length, Matches, Max, Min } from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseStudentsReqDto {
  @IsString()
  @Length(3, 30)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  name: string;

  @IsString()
  @Length(3, 30)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  surname: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Length(0, 20)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '+380123456789' })
  @IsString()
  @Length(12)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Matches(
    /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/,
  )
  phone: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(18)
  @Max(100)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => Number)
  age: number;

  @IsString()
  @Length(2, 5)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  course: string;

  @IsString()
  @Length(5, 10)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  course_format: string;

  @IsString()
  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  course_type: string;

  @IsString()
  @Length(3, 15)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  status: string;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  @Type(() => Number)
  sum: number;

  @ApiProperty({ example: 100000 })
  @IsNumber()
  @Type(() => Number)
  alreadyPaid: number;
}
