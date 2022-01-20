/** @packages */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** @module */
import { User } from './index';

@Entity('tokens')
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'text', nullable: false })
  public token: string;
  @Column({ type: 'varchar', length: 20, default: 'ACTIVE' })
  public status: string;

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
