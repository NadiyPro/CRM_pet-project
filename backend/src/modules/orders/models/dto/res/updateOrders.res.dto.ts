import { CourseEnum } from '../../../../../infrastructure/mysql/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mysql/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mysql/entities/enums/status.enum';
import { MessageEntity } from '../../../../../infrastructure/mysql/entities/message.entity';
import { UserOrderResDto } from './userOrder.res.dto';

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
  created_at: Date | null;
  updated_at?: Date | null;
  manager: UserOrderResDto | null;
  group_id: number | null;
  group_name: string | null;
  messages: MessageEntity[] | null;
  utm: string | null;
  msg: string | null;
}
