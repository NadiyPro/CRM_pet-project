import { ListStudentsQueryReqDto } from '../req/list-students-query.req.dto';
import { BaseStudentsResDto } from './base_students.res.dto';

export class ListStudentsResQueryDto extends ListStudentsQueryReqDto {
  users: BaseStudentsResDto[];
  // масив постів
  total: number;
  // кількість постів
}
