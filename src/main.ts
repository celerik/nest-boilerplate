/** @packages */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/** @application */
import {
  appName,
  appPrefix,
  appVersion,
  isDevelopmentEnv,
  isLocalEnv,
  whiteListMethodsHttp,
  whiteListRoutes,
} from './environments';
import { QueryError } from '@common/exceptions';

/** @module */
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${appPrefix}/${appVersion}`);
  app.enableCors({
    origin: whiteListRoutes,
    methods: whiteListMethodsHttp,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new QueryError());
  if (isDevelopmentEnv || isLocalEnv) {
    const config = new DocumentBuilder()
      .setTitle(appName)
      .setDescription(`The ${appName} API description`)
      .setVersion(appVersion)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(AppModule.port);
}

bootstrap();
