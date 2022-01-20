/** @packages */
import { EntityRepository, Repository } from 'typeorm';

/** @application */
import { Permission } from '@database/entities';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {}
