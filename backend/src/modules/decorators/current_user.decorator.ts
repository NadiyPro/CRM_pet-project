import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IUserData } from '../auth/models/interfaces/user_data.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.res.locals.user as IUserData;
  },
);
// context.switchToHttp перемикає загальний ExecutionContext на HTTP-контекст,
// бо NestJS підтримує кілька транспортів (не лише HTTP),
// і ми повинні явно вказати, що працюємо з HTTP-запитом
// дістаємо дані із запиту (токену) і зберігаємо в локалсах
