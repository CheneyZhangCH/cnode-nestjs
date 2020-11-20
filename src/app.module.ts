import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from './user/user.module'
import { UserEntity } from './user/user.entity'
import { AuthModule } from './auth/auth.module'
import { ArticleModule } from './article/article.module'
import { ArticleEntity } from './article/article.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'cnode',
      password: '123456',
      database: 'cnode_nestjs',
      entities: [UserEntity, ArticleEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
