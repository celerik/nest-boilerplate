import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from '@modules/role/role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from '@modules/permission/permission.service';
import { Pagination } from '@common/classes';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from '@modules/role/dto';
import { PaginateDto, QueryDto } from '@common/dtos';
import { Permission, Role } from '@database/entities';
import { Status } from '@common/enums';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
    private readonly _permissionsService: PermissionService,
    private readonly pagination: Pagination,
  ) {}

  async create(createRole: CreateRoleDto): Promise<RoleDto> {
    const permissions: Permission[] = [];
    for (const permission of createRole.permissions) {
      const permissionValue = await this._permissionsService.findPermission(
        permission,
      );
      permissions.push(permissionValue);
    }
    const role: Role = await this.roleRepository.save({
      ...createRole,
      permissions,
    });
    return plainToClass(RoleDto, role);
  }

  async findPaginate(query: QueryDto): Promise<PaginateDto> {
    return this.pagination.getPaginate(
      {
        type: Role,
        dto: RoleDto,
        fields: ['name'],
        relations: ['permissions'],
        route: 'roles',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async findAll(): Promise<RoleDto[]> {
    const roles: Role[] = await this.roleRepository.find({
      where: { status: Status.ACTIVE },
    });
    if (!roles) {
      throw new NotFoundException('Roles not found');
    }
    return plainToClass(RoleDto, roles);
  }

  async findOne(id: number): Promise<RoleDto> {
    const role: Role = await this.findRole(id);
    return plainToClass(RoleDto, role);
  }

  async findRole(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('The Role ID must be sent');
    }
    const role: Role = await this.roleRepository.findOne(id, {
      where: { status: Status.ACTIVE },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: number, updateRole: UpdateRoleDto): Promise<RoleDto> {
    const role: Role = await this.findRole(id);
    let permissions: Permission[] = role.permissions;
    if (updateRole?.permissions?.length > 0) {
      permissions = [];
      for (const permission of updateRole.permissions) {
        const permissionValue = await this._permissionsService.findPermission(
          permission,
        );
        permissions.push(permissionValue);
      }
    }
    role.name = updateRole.name ?? role.name;
    role.description = updateRole.description ?? role.description;
    role.status = updateRole.status ?? role.status;
    role.permissions = permissions;
    await role.save();
    return plainToClass(RoleDto, role);
  }

  async remove(id: number): Promise<boolean> {
    const role: Role = await this.findRole(id);
    if (role) {
      const deleteRole = await this.roleRepository.softDelete(id);
      return !!deleteRole;
    }
    return false;
  }
}
