import { ListStudentsQueryReqDto } from '../req/listStudentsQuery.req.dto';
import { BaseStudentResDto } from './baseStudents.res.dto';

export class ListStudentsResQueryDto extends ListStudentsQueryReqDto {
  students: BaseStudentResDto[];
  total: number;
}
