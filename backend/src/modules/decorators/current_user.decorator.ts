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
    // context все про поточний запит
    const response = context.switchToHttp().getResponse<CustomResponse>();
    // дістаємо з поточного запиту HTTP-відповідь (дістаємо із запиту дані з відповіді)
    const user = response.locals?.user;
    if (!user) {
      throw new UnauthorizedException('User not found in request context');
    }
    return user;
  },
);
