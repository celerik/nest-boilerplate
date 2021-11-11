import { EntityRepository, Repository } from 'typeorm';
import { Permission, Role, User } from '@database/entities';
import { RoleService } from '@modules/role/role.service';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private readonly _roleService: RoleService) {
    super();
  }

  async findUser(userId?: number, query?: any) {
    const where = userId ? { id: userId, ...query } : query;
    const user = await this.findOne({
      where,
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.permissions = this.getPermissions(user.roles);
    return user;
  }

  getPermissions(roles: Role[]): Permission[] {
    const permissions: Permission[] = [];
    if (roles?.length > 0) {
      for (const role of roles) {
        if (role.permissions?.length > 0) {
          for (const permission of role.permissions) {
            const search = permissions.some(
              (permissionSearch) => permissionSearch.name === permission.name,
            );
            if (!search) {
              permissions.push(permission);
            }
          }
        }
      }
    }
    return permissions;
  }
}
