import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StudentsRepository } from '../../../infrastructure/repository/services/students.repository';
import { ListStudentsQueryReqDto } from '../models/dto/req/list-students-query.req.dto';
import { StudentEntity } from '../../../infrastructure/mysql/entities/student.entity';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { UpdateStudentReqDto } from '../models/dto/req/updateStudent.req.dto';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UpdateStudentResDto } from '../models/dto/res/updateStudent.res.dto';
import { StatusEnum } from '../../../infrastructure/mysql/entities/enums/status.enum';
import { OrdersStatisticResDto } from '../models/dto/res/ordersStatistic.res.dto';

@Injectable()
export class StudentsService {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly userRepository: UserRepository,
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

    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
    });

    if (student.status === StatusEnum.NEW || student.status === null) {
      await this.studentsRepository.update(studentId, {
        ...updateStudentReqDto,
        manager: userData.surname,
        manager_id: user,
        updated_at: new Date(),
        status: StatusEnum.IN_WORK,
      });
    }

    return await this.studentsRepository.findOne({
      where: { id: studentId },
    });
  }

  public async findMySOrder(
    userData: IUserData,
    query: ListStudentsQueryReqDto,
  ): Promise<[StudentEntity[], number]> {
    return await this.studentsRepository.findMySOrder(userData, query);
  }

  public async resetFilters(): Promise<[StudentEntity[], number]> {
    return await this.studentsRepository.resetFilters();
  }

  public async createStudent(
    updateStudentReqDto: UpdateStudentReqDto,
  ): Promise<StudentEntity> {
    const student = this.studentsRepository.create(updateStudentReqDto);
    return await this.studentsRepository.save(student);
  }

  public async deleteId(studentId: string): Promise<string> {
    await this.studentsRepository.delete({ id: studentId });
    return 'The user in the table (db) was successfully deleted';
  }

  public async ordersStatisticAll(): Promise<OrdersStatisticResDto> {
    return await this.studentsRepository.ordersStatisticAll();
  }

  public async ordersStatisticManager(): Promise<OrdersStatisticResDto[]> {
    const statisticAll = await this.studentsRepository.ordersStatisticManager();
    return statisticAll.map((item) => ({
      managerId: item.managerId,
      managerSurname: item.managerSurname,
      total: Number(item.total) || null,
      In_work: Number(item.In_work) || null,
      New: Number(item.New) || null,
      Aggre: Number(item.Aggre) || null,
      Disaggre: Number(item.Disaggre) || null,
      Dubbing: Number(item.Dubbing) || null,
    }));
  }
}
