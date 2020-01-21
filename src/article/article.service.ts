import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ArticlesRO } from './article.controller';
import { CreateArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async findAll(query): Promise<ArticlesRO> {
    console.log(query);

    const articles = await getRepository(ArticleEntity)
      .createQueryBuilder('article')
      .getMany();
    return { articles, articlesCount: 100 };
  }

  async create(@Body() createArticleDto: CreateArticleDto) {
    const { }
    const newArticle = new ArticleEntity()
  }
}
