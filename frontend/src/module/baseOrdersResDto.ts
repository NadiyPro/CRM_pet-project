import { CourseEnum } from './enums/courseEnum';
import { CourseFormatEnum } from './enums/courseFormatEnum';
import { CourseTypeEnum } from './enums/courseTypeEnum';
import { StatusEnum } from './enums/statusEnum';

export interface BaseOrdersResDto {
  id: number | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  phone: string | null;
  age: number | null;
  course: CourseEnum | null;
  course_format: CourseFormatEnum | null;
  course_type: CourseTypeEnum | null;
  status: StatusEnum | null;
  sum: number | null;
  alreadyPaid: number | null;
  created_at: Date;
  updated_at: Date | null;
  manager: string | null;
  group_id: number | null;
  group: string | null;
  messages: MessageEntity[] | null;
}