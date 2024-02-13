import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create an application object
  const app = await NestFactory.create(AppModule);

  // Setup Helmet
  app.use(helmet());

  // Setup Compression
  app.use(compression());

  // Read env files
  const port: number =
    app.get(ConfigService).get<number>('SERVICE_PORT') ?? 3000;
  const clients: string[] = app
    .get(ConfigService)
    .get<string>('SERVICE_CLIENTS')
    ?.split(',');

  // Setup Cors
  app.enableCors({
    origin: clients,
  });

  // Setup base url
  app.setGlobalPrefix('/api');

  // Setup Swagger UI
  const config = new DocumentBuilder()
    .setTitle('Unsiagram')
    .setDescription('Unsiagram API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document);

  // Setup Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  // Listen server to specific port
  await app.listen(port);
  Logger.log(`Unsiagram RESTful API is being run at ${await app.getUrl()}`);
}
bootstrap();
