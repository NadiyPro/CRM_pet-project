import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/services/user.repository';
import { OrdersRepository } from '../../infrastructure/repository/services/orders.repository';
import { StatusEnum } from '../../infrastructure/mysql/entities/enums/status.enum';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: IUserData;
}

@Injectable()
export class OrdersGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userData = request.res.locals.user as IUserData;
    const orderId = request.params.orderId;

    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const orders = await this.ordersRepository.findOne({
      where: { id: +orderId },
      relations: ['manager'],
    });
    if (!orders) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    if (orders.status !== StatusEnum.NEW && orders.status !== null) {
      if (orders.manager.id !== user.id) {
        throw new HttpException(
          'The application is in the works of another manager',
          HttpStatus.CONFLICT,
        );
      }
    }

    return true;
  }
}
