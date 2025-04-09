import { IsString, Length, Matches } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { ApiProperty } from '@nestjs/swagger';

export class GiveRoleDto {
  @IsString()
  @Length(3, 25)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  name: string;

  @IsString()
  @Length(3, 25)
  @Transform(({ value }) => TransformHelper.trim({ value: value as string }))
  @Type(() => String)
  surname: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Length(6, 100)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;
}
