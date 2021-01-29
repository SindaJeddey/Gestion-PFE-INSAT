import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
  );
  await app.listen(process.env.PORT || 3000);
  console.log('listening on 3000 ....');
}
bootstrap();
