import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
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
  // CanActivate - це вбудований клас він буде використовуватися для перевірки доступу до маршруту
  // тобто це типу "охоронець", який вирішує, пускати користувача далі чи ні
  constructor(private readonly reflector: Reflector) {}
  // reflector.get() читає метадані з 'roles'
  // Reflector — це спеціальний сервіс NestJS, який дозволяє читати метадані,
  // встановлені через SetMetadata() (з мого @Role())
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleTypeEnum[]>(
      'roles',
      context.getHandler(), // зчитуємо, що в roles під ключем 'roles'
    );
    if (!roles) return true;
    // зчитуємо які дані ми просали в контролері в декраторі @Role([...])

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    // тут я кажу що хочу отримувати дані із запиту HTTP у форматі <RequestWithUser>
    // з токену в моєму випадку

    const user = request.res.locals.user;
    //  а тут я їх забираю з локалсів

    if (!user) {
      console.error('User not found in request');
      return false;
    }

    return roles.includes(user.role);
  }
}
