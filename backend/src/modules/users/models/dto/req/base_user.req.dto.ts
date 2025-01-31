import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

import { RoleTypeEnum } from '../../../enums/RoleType.enum';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseUserReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  surname: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @Length(0, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @Length(3, 50)
  role: RoleTypeEnum;
}
