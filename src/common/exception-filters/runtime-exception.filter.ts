import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';

import { RuntimeException } from '../exceptions/runtime.exception';

@Catch(RuntimeException)
export class RuntimeExceptionFilter implements ExceptionFilter {
  catch(exception: RuntimeException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const status = exception.getStatus();
    const message = exception.message;
    console.error('exception in RuntimeExceptionFilter', exception); // 에러 메시지 출력 또는 로깅
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}

const ERROR_CODE = {
  E0001: 'Not found',
  E0002: 'user not found',
  E0003: [{ E0031: 'not found ' }, { E0032: 'Not found' }],
};
