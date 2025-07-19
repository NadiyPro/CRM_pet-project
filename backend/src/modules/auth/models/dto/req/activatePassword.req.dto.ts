import { ApiProperty } from '@nestjs/swagger';
import { BaseUserReqDto } from '../../../../users/models/dto/req/baseUser.req.dto';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

export class ActivatePasswordReqDto {
  @ApiProperty({ example: 'Password100425#' })
  @IsString()
  @Length(5, 300)
  @ValidateIf((dto: BaseUserReqDto) => dto.password !== 'admin') // Виконує перевірку тільки якщо пароль не "admin"
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Bad Request',
  })
  password: string;

  @ApiProperty({ example: 'Password100425#' })
  @IsString()
  @Length(5, 300)
  @ValidateIf((dto: BaseUserReqDto) => dto.password !== 'admin') // Виконує перевірку тільки якщо пароль не "admin"
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Bad Request',
  })
  confirm_password: string;

  @IsNotEmpty() // перевіряє, щоб значення поля не було порожнім
  @IsString()
  readonly deviceId: string;
}
// PickType() дозволяє "вибрати" тільки конкретні поля з базового класу
// і використовувати їх у новому DTO
