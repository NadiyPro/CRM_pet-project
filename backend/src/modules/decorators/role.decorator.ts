import { SetMetadata } from '@nestjs/common';

import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';

export const Role = (roles: RoleTypeEnum[]) => SetMetadata('roles', roles);
// SetMetadata додає метадані до методу, тобто за допомогою SetMetadata
//  ми тут просто зберігаємо роль яку вказуємо в контролері, приклад @Role([RoleTypeEnum.Admin])
// а потім за допомогою спец класу Reflector, this.reflector.get<RoleTypeEnum[]> їх зчитати
