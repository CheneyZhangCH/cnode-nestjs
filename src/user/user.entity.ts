import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

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

  @OneToMany(
    type => ArticleEntity,
    article => article.author,
  )
  articles: ArticleEntity[];
}
