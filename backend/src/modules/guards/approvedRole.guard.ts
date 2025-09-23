import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomResponse } from '../auth/guards/jwt_access.guard';

@Injectable()
export class ApprovedRoleGuard implements CanActivate {
  // CanActivate - це інтерфейс guard (@UseGuards())
  constructor(private readonly reflector: Reflector) {}
  // Reflector - інструмент, щоб дістати збережені дані з метаданих
  // (SetMetadata - записуємо дані для збереження в метаданих, Reflector - дістаємо дані з метаданих)

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleTypeEnum[]>(
      'roles',
      context.getHandler(),
    );
    // canActivate - метод, який запускається перед виконанням контролера
    // context - містить дані про поточний запит (handler, class, request, response та ін.)
    // дістаємо дані з метаданих reflector.get(key, context.getHandler())

    if (!roles) return true;
    // якщо в метаданих @Role() нічого не записано, значить доступ до ендпоінту відкритий

    // дістаємо дані з токену (які записали в response.locals при формуванні токену)
    const response = context.switchToHttp().getResponse<CustomResponse>();
    const user = response.locals?.user;

    if (!user) {
      // console.error('User not found ');
      return false;
    }

    // перевіряємо чи в locals збережена роль відповідає ролі вказаній в метаданих @Role([...])
    // якщо так то includes поверне нам true і ми пропускаємо користувача на ендпоінт,
    // інакше повернемо false і видамо помилку статусом 403 та не пропустимо до методу контролера (ендпоінту)
    return roles.includes(user.role);
  }
}
