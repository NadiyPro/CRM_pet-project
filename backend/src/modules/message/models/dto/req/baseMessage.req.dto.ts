import { IsString, Length } from 'class-validator';

export class BaseMessageReqDto {
  @IsString()
  @Length(5, 200)
  message: string | null;
}
