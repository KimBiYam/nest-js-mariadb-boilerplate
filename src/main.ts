import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config';
import { ConfigService } from '@nestjs/config';
import LoggingInterceptor from './interceptors/logging.interceptor';
import ConvertResponseInterceptor from './interceptors/convert-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT') || 5000;

  if (configService.get('NODE_ENV') === 'DEVELOPMENT') {
    setupSwagger(app);
  }
  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ConvertResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
