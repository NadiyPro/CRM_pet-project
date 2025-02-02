import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '../../../infrastructure/repository/services/refresh-token.repository';
import { StudentsRepository } from '../../../infrastructure/repository/services/students.repository';

@Injectable()
export class StudentsService {
  constructor(
    // private readonly configService: ConfigService<Config>,
    private readonly studentsRepository: StudentsRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
}
