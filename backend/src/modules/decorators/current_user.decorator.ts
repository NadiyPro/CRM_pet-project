import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
interface CustomResponse extends Response {
  locals: {
    user?: IUserData;
    [key: string]: any;
  };
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): IUserData => {
    const response = context.switchToHttp().getResponse<CustomResponse>();
    const user = response.locals?.user;
    if (!user) {
      // без user → guard не пройшов або щось пішло не так
      throw new UnauthorizedException('User not found in request context');
    }
    return user;
  },
);

// interface CustomResponse extends Response {
//   locals: {
//     user: IUserData;
//     [key: string]: any;
//   };
// }
//
// export const CurrentUser = createParamDecorator(
//   (_data: unknown, context: ExecutionContext): IUserData => {
//     const response = context.switchToHttp().getResponse<CustomResponse>();
//     return response.locals.user;
//   },
// );

// export const CurrentUser = createParamDecorator(
//   (_data: unknown, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest<Request>();
//     return request.res.locals.user as IUserData;
//   },
// );
// context.switchToHttp перемикає загальний ExecutionContext на HTTP-контекст,
// бо NestJS підтримує кілька транспортів (не лише HTTP),
// і ми повинні явно вказати, що працюємо з HTTP-запитом
// дістаємо дані із запиту (токену) і зберігаємо в локалсах
// interface CustomResponse extends Response {
//   locals: {
//     user: IUserData;
//     [key: string]: any;
//   };
// }
//
// export const CurrentUser = createParamDecorator(
//   (_data: unknown, context: ExecutionContext): IUserData => {
//     const response = context.switchToHttp().getResponse<CustomResponse>();
//     return response.locals.user;
//   },
// );
