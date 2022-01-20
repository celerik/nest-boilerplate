/** @application */
import { SimplifiedRoleDto } from '@modules/role/dto';
import { SimplifiedPermissionDto } from '@modules/permission/dto';

export interface JwtPayloadInterface {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  roles: SimplifiedRoleDto[];
  permissions: SimplifiedPermissionDto[];
  iat?: Date;
}
