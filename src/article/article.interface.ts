import { ArticleEntity } from './article.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderByEnum {
  desc = 'DESC',
  asc = 'ASC',
}
export enum ScopeEnum {
  mine = 'mine',
  all = 'all',
}

export interface ArticlesRO {
  code: number;
  data?: ArticleEntity[];
  pageIndex?: number;
  pageSize?: number;
  totalCount: number;
  errorMsg?: string;
}

export class ArticleQuery {
  @ApiProperty({
    required: false,
    description: '页码',
    example: 1,
  })
  pageIndex?: number;

  @ApiProperty({
    required: false,
    description: '分页尺寸',
    example: 20,
  })
  pageSize?: number;

  @ApiProperty({
    required: false,
    description: '排序',
    example: 'created',
  })
  sortBy?: string;

  @ApiProperty({
    required: false,
    description: '升序 or 降序',
    enum: OrderByEnum,
  })
  orderBy?: OrderByEnum;

  @ApiProperty({
    required: false,
    enum: ScopeEnum,
  })
  scope?: ScopeEnum;
}
