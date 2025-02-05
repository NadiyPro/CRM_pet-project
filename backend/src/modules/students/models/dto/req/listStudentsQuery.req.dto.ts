import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class ListStudentsQueryReqDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 25;
  // ліміт відображення

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Transform(({ value }) =>
    TransformHelper.toLowerCase({ value: value as string }),
  )
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sortField?: string;

  @IsString()
  @IsOptional()
  sortASCOrDESC?: string;
}
