import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './index';
import { Status } from '../../common/enums';

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', length: 25, nullable: false })
  public name: string;
  @Column({ type: 'text', nullable: false })
  public description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  public roles: Role[];

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
