import { CourseEnum } from '../../../../../infrastructure/mysql/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mysql/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mysql/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mysql/entities/enums/status.enum';
import { UserEntity } from '../../../../../infrastructure/mysql/entities/user.entity';

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
  manager: UserEntity;
}
