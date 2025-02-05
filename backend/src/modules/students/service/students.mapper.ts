import { ListUsersQueryReqDto } from '../../users/models/dto/req/listUsersQuery.req.dto';
import { StudentEntity } from '../../../infrastructure/mysql/entities/student.entity';
import { BaseStudentResDto } from '../models/dto/res/baseStudents.res.dto';
import { ListStudentsResQueryDto } from '../models/dto/res/listStudentsQuery.res.dto';

export class StudentsMapper {
  public static toResDto(student: StudentEntity): BaseStudentResDto {
    return {
      id: student.id,
      name: student.name,
      surname: student.surname,
      email: student.email,
      phone: student.phone,
      age: student.age,
      course: student.course,
      course_format: student.course_format,
      course_type: student.course_type,
      status: student.status,
      sum: student.sum,
      alreadyPaid: student.alreadyPaid,
      created_at: student.created_at,
      managerId: student.manager.id,
      managerSurname: student.manager.surname,
      group: student.group.group,
      messages: student.messages,
      deleted: student.deleted,
    };
  }

  public static toAllResDtoList(
    students: StudentEntity[],
    total: number,
    query: ListUsersQueryReqDto,
  ): ListStudentsResQueryDto {
    return {
      students: students.map((student) => this.toResDto(student)),
      total,
      ...query,
    };
  }

  public static resetFiltersResDto(student: StudentEntity): BaseStudentResDto {
    return {
      id: student.id,
      name: student.name,
      surname: student.surname,
      email: student.email,
      phone: student.phone,
      age: student.age,
      course: student.course,
      course_format: student.course_format,
      course_type: student.course_type,
      status: student.status,
      sum: student.sum,
      alreadyPaid: student.alreadyPaid,
      created_at: student.created_at,
      managerId: student.manager.id,
      managerSurname: student.manager.surname,
      group: student.group.group,
      messages: student.messages,
      deleted: student.deleted,
    };
  }

  public static resetFiltersAllResDtoList(
    students: StudentEntity[],
    total: number,
  ): ListStudentsResQueryDto {
    return {
      students: students.map((student) => this.resetFiltersResDto(student)),
      total,
    };
  }
}
