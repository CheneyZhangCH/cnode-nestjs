import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleQuery, ArticlesRO, ScopeEnum } from './article.interface';
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

  async findAllArticles(
    query: ArticleQuery,
    userId: number,
  ): Promise<ArticlesRO> {
    const {
      pageIndex = 1,
      pageSize = 20,
      sortBy = 'created',
      orderBy = 'DESC',
      scope = 'mine',
    } = query;
    const qb = await getRepository(ArticleEntity).createQueryBuilder('article');
    if (scope === ScopeEnum.mine) {
      qb.andWhere('article.author = :id', { id: userId });
    }

    const newOrderBy = /desc/gi.test(orderBy) ? 'DESC' : 'ASC';
    qb.orderBy(`article.${sortBy}`, newOrderBy);
    const totalCount = await qb.getCount();
    qb.limit(pageSize).offset((pageIndex - 1) * pageSize);

    const articles = await qb.getMany();

    return {
      code: 200,
      data: articles,
      pageIndex,
      pageSize,
      totalCount,
    };
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

    await this.userRepository.save(author);

    return newArticle;
  }
}
