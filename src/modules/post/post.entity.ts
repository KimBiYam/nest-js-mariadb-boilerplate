import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user';

@Entity()
@Index(['id'], { unique: true })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  created: Date;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  user: string;
}
