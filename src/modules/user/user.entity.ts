import { PasswordTransformer } from '../../util/passwordTransformer';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
@Index(['id'], { unique: true })
@Unique(['userId', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', transformer: new PasswordTransformer() })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'tinyint', default: true })
  isActive: boolean;

  // @OneToMany(() => PostEntity, (post) => post.user)
  // posts: PostEntity[];
}
