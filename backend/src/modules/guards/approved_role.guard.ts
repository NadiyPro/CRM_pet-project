import { RoleTypeEnum } from '../../infrastructure/mySQL/entities/enums/RoleType.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface RequestWithUser extends Request {
  res: {
    locals: {
      user?: {
        role: RoleTypeEnum;
      };
    };
  };
}

@Injectable()
export class ApprovedRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleTypeEnum[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) return true;

    // Типізуємо `request` через `RequestWithUser`
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    console.log('Request user:', request.res.locals.user);

    const user = request.res.locals.user;

    if (!user) {
      console.error('User not found in request');
      return false;
    }

    return roles.includes(user.role);
  }
}
