import { CourseEnum } from './enums/courseEnum';
import { CourseFormatEnum } from './enums/courseFormatEnum';
import { CourseTypeEnum } from './enums/courseTypeEnum';
import { StatusEnum } from './enums/statusEnum';
import { MessageDto } from './message.dto';
import { UserDto } from './user.dto';

export interface UpdateOrdersResDto {
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
  updated_at?: Date | null;
  manager: UserDto;
  group_id: number | null;
  group_name: string | null;
  messages: MessageDto[] | null;
  utm: string | null;
  msg: string | null;
}