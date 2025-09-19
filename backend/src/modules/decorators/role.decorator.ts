import { SetMetadata } from '@nestjs/common';

import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';

export const Role = (roles: RoleTypeEnum[]) => SetMetadata('roles', roles);
// тут ми зберігаємо в метаданих roles масив під ключем 'roles',
// які вказуємо при викликі декоратора, наприклад @Role([RoleTypeEnum.Admin])
// далі в ApprovedRoleGuard ми читаємо ці roles і перевіряємо, чи дозволений доступ до ендпоінта
