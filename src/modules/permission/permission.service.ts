/** @packages */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';

/** @application */
import { Pagination } from '@common/classes';
import { Permission } from '@database/entities';
import { PaginateDto, QueryDto } from '@common/dtos';

/** @module */
import { CreatePermissionDto, PermissionDto, UpdatePermissionDto } from './dto';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
    private readonly pagination: Pagination,
  ) {}

  async create(createPermission: CreatePermissionDto): Promise<PermissionDto> {
    const permission: Permission = await this.permissionRepository.save(
      createPermission,
    );
    if (!permission) {
      throw new BadRequestException('Error creating the permission');
    }
    return plainToClass(PermissionDto, permission);
  }

  async findPaginate(query: QueryDto): Promise<PaginateDto> {
    return this.pagination.getPaginate(
      {
        type: Permission,
        dto: PermissionDto,
        fields: ['name'],
        relations: ['roles'],
        route: 'permissions',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async findAll(): Promise<PermissionDto[]> {
    const permissions: Permission[] = await this.findPermissions();
    return plainToInstance(PermissionDto, permissions);
  }

  async findPermissions(): Promise<Permission[]> {
    const permissions: Permission[] = await this.permissionRepository.find({
      order: { status: 'ASC', name: 'ASC' },
    });
    if (!permissions) {
      throw new NotFoundException('Permissions not found');
    }
    return plainToInstance(Permission, permissions);
  }

  async findOne(id: number): Promise<PermissionDto> {
    const permission: Permission = await this.findPermission(id);
    return plainToClass(PermissionDto, permission);
  }

  async findPermission(id: number): Promise<Permission> {
    if (!id) {
      throw new BadRequestException('The permission ID must be sent');
    }
    const permission: Permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async update(
    id: number,
    updatePermission: UpdatePermissionDto,
  ): Promise<PermissionDto> {
    const permission: Permission = await this.findPermission(id);
    permission.name = updatePermission.name ?? permission.name;
    permission.description =
      updatePermission.description ?? permission.description;
    permission.status = updatePermission.status ?? permission.status;
    await permission.save();
    return plainToClass(PermissionDto, permission);
  }

  async remove(id: number): Promise<boolean> {
    const permission: Permission = await this.findPermission(id);
    if (permission) {
      const deletePermission = await this.permissionRepository.softDelete(id);
      return !!deletePermission;
    }
    return false;
  }
}
