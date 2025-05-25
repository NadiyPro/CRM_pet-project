import { CourseEnum } from './enums/courseEnum';
import { CourseFormatEnum } from './enums/courseFormatEnum';
import { CourseTypeEnum } from './enums/courseTypeEnum';
import { StatusEnum } from './enums/statusEnum';

export interface UpdateOrdersReqDto {
  name?: string | null;
  surname?: string | null;
  email?: string | null;
  phone?: string | null;
  age?: number | null;
  course?: CourseEnum | null;
  course_format?: CourseFormatEnum | null;
  course_type?: CourseTypeEnum | null;
  status?: StatusEnum | null;
  sum?: number | null;
  alreadyPaid?: number | null;
}