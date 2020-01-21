import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: '文章标题',
    example: '论我是怎样炼废的',
  })
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: '文章简介',
    example: '我！炼废了',
  })
  readonly description: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: '文章内容',
    example: '来人，拖出去砍了',
  })
  content: string;
}
