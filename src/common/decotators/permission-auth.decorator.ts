/** @packages */
import { SetMetadata } from '@nestjs/common';

/** @application */
import { PermissionAuthInterface } from '@common/interfaces';

export const PermissionAuth = (params: PermissionAuthInterface) =>
  SetMetadata('permission-auth', params);
