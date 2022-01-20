/** @packages */
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** @application */
import { Status } from '../../common/enums';

/** @module */
import { Permission, User } from './index';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', length: 25, nullable: false })
  public name: string;
  @Column({ type: 'text', nullable: false })
  public description: string;

  @ManyToMany(() => User, (user) => user.roles)
  public users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({ name: 'role_permissions' })
  public permissions: Permission[];

  @Column({ type: 'varchar', default: Status.ACTIVE, length: 8 })
  public status: string;
  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;

  @AfterLoad()
  setName() {
    const nameString = this.name;
    this.name = nameString.toUpperCase();
  }
}
