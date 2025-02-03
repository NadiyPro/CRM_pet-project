import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentsRepository } from '../../../infrastructure/repository/services/students.repository';
import { ListStudentsQueryReqDto } from '../models/dto/req/list-students-query.req.dto';
import { StudentEntity } from '../../../infrastructure/mySQL/entities/student.entity';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { UpdateStudentReqDto } from '../models/dto/req/updateStudent.req.dto';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UpdateStudentResDto } from '../models/dto/res/updateStudent.res.dto';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly userRepository: UserRepository,
    // private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findAll(
    query: ListStudentsQueryReqDto,
  ): Promise<[StudentEntity[], number]> {
    return await this.studentsRepository.findAll(query);
  }

  public async updateId(
    userData: IUserData,
    studentId: string,
    updateStudentReqDto: UpdateStudentReqDto,
  ): Promise<UpdateStudentResDto> {
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.studentsRepository.update(studentId, {
      ...updateStudentReqDto,
      manager: userData.surname,
      updated_at: new Date(),
    });

    return await this.studentsRepository.findOne({
      where: { id: studentId },
    });
  }
  //
  //
  //create
  //
  //
  // public async deleteId(groupId: string): Promise<string> {
  //   await this.groupRepository.delete({ id: groupId });
  //   return 'The user in the table (db) has been successfully marked as deleted';
  // }
  //
  // public async ordersStatisticId(
  //   query: ListUsersQueryReqDto,
  // userId: string,
  // ): Promise<статистика> {
  //   return await this.userRepository.findOne(userId, query);
  // }
}
