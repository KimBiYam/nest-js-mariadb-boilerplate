import { PasswordTransformer } from '../../util/passwordTransformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['userId', 'email'])
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    type: 'varchar',
    transformer: new PasswordTransformer(),
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'tinyint', default: true })
  isActive: boolean;
}
