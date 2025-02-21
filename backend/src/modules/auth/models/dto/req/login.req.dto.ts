import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsString, Length } from 'class-validator';

export class LoginReqDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @Length(0, 300)
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @Length(0, 300)
  password: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  is_active: boolean;

  @IsString()
  deviceId: string;
}
