import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationErrorFilter } from './filters/validation-error.filter';
import { RolesGuard } from './authentication/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
  );
  app.useGlobalFilters(new ValidationErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('Gestion PFE')
    .setDescription('Gestion des PFE API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
