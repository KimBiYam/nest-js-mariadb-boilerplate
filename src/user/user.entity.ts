import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Index(['id'], { unique: true })
@Unique(['userId', 'email'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  created: Date;

  @Column({ default: true })
  isActive: boolean;
}
