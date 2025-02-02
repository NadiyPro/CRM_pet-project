import { SetMetadata } from '@nestjs/common';

import { RoleTypeEnum } from '../../../infrastructure/mySQL/entities/enums/RoleType.enum';

export const Role = (roles: RoleTypeEnum) => SetMetadata('roles', roles);
