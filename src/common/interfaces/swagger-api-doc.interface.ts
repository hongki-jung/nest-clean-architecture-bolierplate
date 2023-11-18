import { HttpStatus, Type } from '@nestjs/common';
import {
  ApiBodyOptions,
  ApiHeaderOptions,
  ApiParamOptions,
  ApiQueryOptions,
} from '@nestjs/swagger';
import { ErrorCodeDetails } from 'src/common/interfaces/error.interface';

interface CustomApiResponse {
  status: HttpStatus;
  responseType: Type<unknown> | null;
  message?: string;
}

export interface SwaggerApiDoc {
  summary: string;
  description: string;
  tags?: string[];
  response: CustomApiResponse[];
  errorExceptionResponse?: ErrorCodeDetails[];
  consumes?: string[];
  headers?: ApiHeaderOptions | ApiHeaderOptions[];
  params?: ApiParamOptions | ApiParamOptions[];
  query?: ApiQueryOptions | ApiQueryOptions[];
  body?: ApiBodyOptions;
}
