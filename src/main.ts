/** @format */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception';

dotenv.config({
  path: `${process.cwd()}/.env`,
});

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      bufferLogs: true,
    });

    // API prefix version
    app.setGlobalPrefix('api/v1');

    // Handle exceptions (Catch all exceptions)
    app.useGlobalFilters(new AllExceptionsFilter());

    // Cors
    const options = {
      origin: '*',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    };
    app.enableCors(options);

    // Static folder
    app.useStaticAssets(`${__dirname}/public`);

    // // Body Parser
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    // Swagger document
    const config = new DocumentBuilder()
      .setTitle('99Tech  Swagger')
      .setDescription('99Tech API description')
      .addBearerAuth()
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.listen(process.env.PORT);

    console.table([
      {
        title: 'App Start'.toUpperCase(),
        body: `${`http://localhost:${process.env.PORT}/`}`,
      },
      {
        title: 'Swagger Documentation'.toUpperCase(),
        body: `${`http://localhost:${process.env.PORT}/docs`}`,
      },
    ]);
  } catch (error) {
    console.log('error:', error);
  }
}

bootstrap();
