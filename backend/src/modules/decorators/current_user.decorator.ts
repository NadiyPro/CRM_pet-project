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
      throw new UnauthorizedException('User not found in request context');
    }
    return user;
  },
);
