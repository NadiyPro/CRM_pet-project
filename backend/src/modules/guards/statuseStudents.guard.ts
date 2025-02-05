import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/services/user.repository';
import { StudentsRepository } from '../../infrastructure/repository/services/students.repository';
import { StatusEnum } from '../../infrastructure/mysql/entities/enums/status.enum';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: IUserData;
}

@Injectable()
export class StudentOwnershipGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentsRepository: StudentsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const userData = request.user;
    const studentId = request.params.studentId;

    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
    });
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    if (student.status !== StatusEnum.NEW || student.status !== null) {
      if (student.manager?.id !== user.id) {
        throw new HttpException(
          'The application is in the works of another manager',
          HttpStatus.CONFLICT,
        );
      }
    }

    return true;
  }
}
