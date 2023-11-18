import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './validation-exception.filter';
import { RuntimeExceptionFilter } from './runtime-exception.filter';

@Module({
  imports: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: RuntimeExceptionFilter,
    },
  ],
})
export class ExceptionFilterModule {}
