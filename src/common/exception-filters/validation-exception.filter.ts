import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.error('exception in ValidationExceptionFilter', exception); // 에러 메시지 출력 또는 로깅

    response.status(HttpStatus.BAD_REQUEST).json({
      status: true,
      code: 'E000',
      message: exception.getMessage(),
      data: {},
    });
  }
}
