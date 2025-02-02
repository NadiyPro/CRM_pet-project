import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IUserData } from '../models/interfaces/user_data.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>(); // Додаємо типізацію
    return request.res.locals.user as IUserData; // Перевіряємо наявність `locals`
  },
);
