import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { QueryError } from '@common/exceptions';
import 'dotenv/config';

async function bootstrap() {
  const routeApp = process.env.APP_ROUTE;
  const routeAppApi = process.env.APP_ROUTE_API;
  const environment = process.env.NODE_ENV;
  const routes =
    environment === 'development'
      ? [
          routeAppApi,
          routeApp,
          'http://localhost:8000',
          'http://localhost:5000',
          'http://localhost:3000',
        ]
      : [routeAppApi, routeApp];
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: routes,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalFilters(new QueryError());
  if (environment !== 'production') {
    const APP_NAME = process.env.APP_PROJECT;
    const APP_VERSION = process.env.npm_package_version;
    const config = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(`The ${APP_NAME} API description`)
      .setVersion(APP_VERSION)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(AppModule.port);
}

bootstrap();
