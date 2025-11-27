import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/services/user.repository';
import { OrdersRepository } from '../../infrastructure/repository/services/orders.repository';
export declare class OrdersGuard implements CanActivate {
    private readonly userRepository;
    private readonly ordersRepository;
    constructor(userRepository: UserRepository, ordersRepository: OrdersRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
