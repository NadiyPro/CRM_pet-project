import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomResponse } from '../auth/guards/jwt_access.guard';

@Injectable()
export class ApprovedRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleTypeEnum[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) return true;

    const response = context.switchToHttp().getResponse<CustomResponse>();
    const user = response.locals?.user;

    if (!user) {
      console.error('User not found ');
      return false;
    }

    return roles.includes(user.role);
  }
}
