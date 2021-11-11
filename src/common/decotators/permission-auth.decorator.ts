import { SetMetadata } from '@nestjs/common';
import { PermissionAuthInterface } from '@common/interfaces';

export const PermissionAuth = (params: PermissionAuthInterface) =>
  SetMetadata('permission-auth', params);
