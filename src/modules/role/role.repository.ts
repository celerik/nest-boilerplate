/** @packages */
import { EntityRepository, Repository } from 'typeorm';

/** @application */
import { Role } from '@database/entities';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
