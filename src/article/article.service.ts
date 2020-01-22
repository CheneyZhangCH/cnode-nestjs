import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ArticlesRO } from './article.controller';
import { CreateArticleDto } from './dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findAll(query): Promise<ArticlesRO> {
    console.log(query);

    const articles = await getRepository(ArticleEntity)
      .createQueryBuilder('article')
      .getMany();
    return { articles, articlesCount: 100 };
  }

  async create(userId: number, createArticleDto: CreateArticleDto) {
    const { title, description, content } = createArticleDto;
    const article = new ArticleEntity();
    article.title = title;
    article.description = description;
    article.content = content;
    const newArticle = await this.articleRepository.save(article);
    const author = await this.userRepository.findOne({ where: { id: userId } });

    if (Array.isArray(author.articles)) {
      author.articles.push(article);
    } else {
      author.articles = [article];
    }
    console.log(author);

    await this.userRepository.save(author);

    return newArticle;
  }
}
