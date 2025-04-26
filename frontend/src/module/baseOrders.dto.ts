import { CourseEnum } from './enums/courseEnum';
import { CourseFormatEnum } from './enums/courseFormatEnum';
import { CourseTypeEnum } from './enums/courseTypeEnum';
import { StatusEnum } from './enums/statusEnum';
import { MessageDto } from './message.dto';

export interface ListOrdersDto {
  orders: BaseOrdersDto[];
  total: number;
}

export interface BaseOrdersDto {
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
  created_at: string;
  updated_at: string | null;
  manager: string | null;
  group_id: number | null;
  group_name: string | null;
  messages: MessageDto[] | null;
}