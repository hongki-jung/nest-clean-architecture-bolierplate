import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import swaggerInit from './swagger';
import { ValidationException } from './common/exceptions/validation.exception';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerInit(app);

  // 글로벌 파이프 세팅
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorObj = errors[0].constraints;
        const [errorObjKey] = Object.keys(errorObj);
        throw new ValidationException(errorObj[errorObjKey]);
      },
    }),
  );
  await app.listen(3400);
}
bootstrap();
