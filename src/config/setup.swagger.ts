import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.SWAGGER_API_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};
