import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/services/user.repository';
import { StudentsRepository } from '../../infrastructure/repository/services/students.repository';
import { StatusEnum } from '../../infrastructure/mySQL/entities/enums/status.enum';

@Injectable()
export class StudentOwnershipGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentsRepository: StudentsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userData = request.user;
    const studentId = request.params.studentId;
    // CanActivate – інтерфейс, який визначає, чи дозволено виконання запиту
    // ExecutionContext – надає доступ до контексту виконання (наприклад, до HTTP-запиту)
    // отримуємо дані користувача з контексту запиту
    // через switchToHttp() ми отримуємось доступ до HTTP запиту,
    // а через getRequest() дістаємо об'єкт запиту (request)
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

    if (student.status !== StatusEnum.NEW && student.status !== null) {
      throw new HttpException(
        'The application is in the works of another manager',
        HttpStatus.CONFLICT,
      );
    }

    return true;
  }
}
