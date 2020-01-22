import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto';
import { User } from '../user/user.decorator';
import { ArticleQuery, ArticlesRO } from './article.interface';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '创建文章' })
  async createArticles(
    @User('id') userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return await this.articleService.create(userId, createArticleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  async findAllArticles(
    @Query() query: ArticleQuery,
    @User('id') userId: number,
  ): Promise<ArticlesRO> {
    return await this.articleService.findAllArticles(query, userId);
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
}
