import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto';
import { User } from '../user/user.decorator';

export interface ArticlesRO {
  articles: ArticleEntity[];
  articlesCount: number;
}

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  async findAllArticles(@Query() query): Promise<ArticlesRO> {
    return await this.articleService.findAll(query);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiOperation({ summary: '获取文章详情' })
  // @Get(':id')
  // async getArticleDetail(@Param('id') id: number) {
  //   const result = await this.articleService.findById(id);
  //   console.log(result);
  //   if (result) {
  //     return result;
  //   } else {
  //     return { code: 404, errorMsg: '未找到用户' };
  //   }
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '创建文章' })
  async createArticles(
    @User('id') userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    console.log(userId);
    console.log(createArticleDto);
    return await this.articleService.create(userId, createArticleDto);
  }
}
