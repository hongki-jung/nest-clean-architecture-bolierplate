import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { DatabaseException } from '../exceptions/database.exception';

@Catch(DatabaseException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private logger = new Logger(DatabaseExceptionFilter.name);
  catch(exception: DatabaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.error('exception in DatabaseExceptionFilter', exception); // 에러 메시지 출력 또는 로깅
    const data = {
      code: 'E003',
      data: {},
      message: exception.message,
      status: true,
    };

    response.status(200).json(data);
  }
}
