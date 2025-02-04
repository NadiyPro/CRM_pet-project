import { SetMetadata } from '@nestjs/common';

import { RoleTypeEnum } from '../../../infrastructure/mysql/entities/enums/roleType.enum';

export const Role = (roles: RoleTypeEnum) => SetMetadata('roles', roles);
