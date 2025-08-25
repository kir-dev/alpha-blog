import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import cors from 'cors';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('API').setDescription('API description').setVersion('1.0').build();
  const documentFactory = (): OpenAPIObject => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(
    '/scalar',
    apiReference({
      spec: {
        content: documentFactory,
      },
    })
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
