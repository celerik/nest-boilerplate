/** @packages */
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';

/** @module */
import { Permission, Role, Token } from './index';

@Entity('users')
@Unique('unique_fields_users', ['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', length: 250, nullable: false })
  public name: string;
  @Column({ type: 'varchar', length: 250, nullable: false })
  public lastname: string;
  @Column({ type: 'varchar', length: 50, nullable: false })
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

  @OneToMany(() => Token, (token) => token.user)
  public tokens: Token[];

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
    const salt = await genSalt(10);
    this.password = await hash(password || this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
