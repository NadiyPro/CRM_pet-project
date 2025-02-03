import { ListStudentsQueryReqDto } from '../req/list-students-query.req.dto';
import { BaseStudentResDto } from './base_students.res.dto';

export class ListStudentsResQueryDto extends ListStudentsQueryReqDto {
  students: BaseStudentResDto[];
  // масив постів
  total: number;
  // кількість постів
}
