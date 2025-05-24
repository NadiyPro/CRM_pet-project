import { SortFieldEnum } from './enums/sortFieldEnum';
import { SortASCOrDESCEnum } from './enums/sortASCOrDESCEnum';
import { CourseEnum } from './enums/courseEnum';
import { CourseFormatEnum } from './enums/courseFormatEnum';
import { CourseTypeEnum } from './enums/courseTypeEnum';
import { StatusEnum } from './enums/statusEnum';

export interface ListOrdersAllDto {
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
  manager?: string | null;
  group_id?: number | null;
  group_name?: string | null;
  created_at_from?: string | null;
  created_at_to?: string | null;
  limit?: number,
  page?: number,
  sortField?: SortFieldEnum;
  sortASCOrDESC?: SortASCOrDESCEnum;
  my?: boolean;
}