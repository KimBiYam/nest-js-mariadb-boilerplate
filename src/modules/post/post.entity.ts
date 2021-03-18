import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user';

@Entity()
@Index(['id'], { unique: true })
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  created: Date;

  @ManyToOne(() => UserEntity, (user) => user.id, { cascade: true })
  user: string;
}
