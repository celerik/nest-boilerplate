import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Permission, Role } from './index';

@Entity('users')
@Unique('unique_fields_users', ['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', length: 150, nullable: false })
  public name: string;
  @Column({ type: 'varchar', length: 150, nullable: false })
  public lastname: string;
  @Column({ type: 'varchar', length: 40, nullable: false })
  public username: string;
  @Column({ type: 'varchar', nullable: false })
  public email: string;
  @Column({ type: 'varchar', nullable: true })
  public phone: string;
  @Column({ type: 'varchar', nullable: false })
  public password: string;

  permissions: Permission[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  public roles: Role[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  public status: string;
  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
