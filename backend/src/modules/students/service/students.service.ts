import { Injectable } from '@nestjs/common';
import { StudentsRepository } from '../../../infrastructure/repository/services/students.repository';
import { ListStudentsQueryReqDto } from '../models/dto/req/list-students-query.req.dto';
import { StudentEntity } from '../../../infrastructure/mySQL/entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    // private readonly configService: ConfigService<Config>,
    private readonly studentsRepository: StudentsRepository,
    // private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findAll(
    query: ListStudentsQueryReqDto,
  ): Promise<[StudentEntity[], number]> {
    return await this.studentsRepository.findAll(query);
  }
}
