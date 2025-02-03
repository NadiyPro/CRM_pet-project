import { CourseEnum } from '../../../../../infrastructure/mySQL/entities/enums/course.enum';
import { CourseFormatEnum } from '../../../../../infrastructure/mySQL/entities/enums/courseFormat.enum';
import { CourseTypeEnum } from '../../../../../infrastructure/mySQL/entities/enums/courseType.enum';
import { StatusEnum } from '../../../../../infrastructure/mySQL/entities/enums/status.enum';

export interface UpdateStudentResDto {
  id: string | null;
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
  deleted: Date | null;
  created_at: Date;
  updated_at: Date;
  manager: string | null;
}
