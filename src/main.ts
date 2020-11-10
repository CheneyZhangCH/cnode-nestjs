import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'

import { logger } from './middleware/logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('Cnode Website Api')
    .setDescription('Cnode Website Api')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)
  app.enableCors()
  app
    .use(cookieParser())
    .use(helmet())
    .use(
      rateLimit({
        windowMs: 60 * 1000, // 1 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    )
    .use(logger)

  await app.listen(3000)
}

bootstrap()
