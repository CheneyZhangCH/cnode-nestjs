import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  @Index()
  @Column({ default: '' })
  tel: string;

  @Column({ default: '' })
  avatar: string;

  @CreateDateColumn()
  createAt: string;
}
