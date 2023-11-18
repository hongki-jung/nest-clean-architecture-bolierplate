import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SwaggerApiDoc } from 'src/common/interfaces/swagger-api-doc.interface';
import { isEmpty } from 'lodash';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { ErrorExceptionDto } from 'src/common/dto/error.dto';
import { ErrorCodeDetails } from 'src/common/interfaces/error.interface';

const createDecorators = <T>(
  options: T | T[],
  decoratorFn: (option: T) => MethodDecorator,
): MethodDecorator[] => {
  const optionsArray = Array.isArray(options) ? options : [options];
  return optionsArray.map((option) => decoratorFn(option));
};

const createResponseDtoType = <T extends Type<unknown>>(
  status: HttpStatus,
  type: T | null,
  message?: string,
) => {
  const response = {
    status,
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResponseDto) },
        {
          properties: {
            data: type ? { $ref: getSchemaPath(type) } : {},
            status: { type: 'integer', example: status },
            message: { type: 'string', example: message },
          },
        },
      ],
    },
  };

  return applyDecorators(
    ApiExtraModels(BaseResponseDto, type || Function),
    ApiResponse(response),
  );
};

const createMultipleResponseDtoTypes = (
  statusAndTypes: Array<{
    status: HttpStatus;
    responseType: Type<unknown> | null;
    message?: string;
  }>,
): MethodDecorator[] => {
  return statusAndTypes.map(({ status, responseType, message }) =>
    createResponseDtoType(status, responseType, message),
  );
};

const createErrorExceptionResponseDtoType = (
  errorCodeDetails: ErrorCodeDetails,
) => {
  const { code, httpStatus, message } = errorCodeDetails;
  const response = {
    status: httpStatus,
    schema: {
      allOf: [
        { $ref: getSchemaPath(ErrorExceptionDto) },
        {
          properties: {
            code: { type: 'integer', example: code },
            status: { type: 'integer', example: httpStatus },
            message: { type: 'string', example: message },
          },
        },
      ],
    },
  };

  return applyDecorators(
    ApiExtraModels(ErrorExceptionDto),
    ApiResponse(response),
  );
};

const createMultipleErrorExceptionResponseDtoTypes = (
  errorCodes: ErrorCodeDetails[] | undefined,
): MethodDecorator[] => {
  return errorCodes
    ? errorCodes.map((errorCode) =>
        createErrorExceptionResponseDtoType(errorCode),
      )
    : [];
};

export const GenerateSwaggerApiDoc = (swaggerApiDoc: SwaggerApiDoc) => {
  const {
    summary,
    description,
    response,
    errorExceptionResponse,
    tags = [],
    consumes = [],
    headers = [],
    params = [],
    query = [],
    body,
  } = swaggerApiDoc;

  const tagDecorators = Array.isArray(tags) ? [ApiTags(...tags)] : [];
  const consumesDecorators = createDecorators(consumes, ApiConsumes);
  const headerDecorators = createDecorators(headers, ApiHeader);
  const paramDecorators = createDecorators(params, ApiParam);
  const queryDecorators = createDecorators(query, ApiQuery);

  const bodyDecorator = !isEmpty(body) ? [ApiBody(body)] : [];

  const responseDecorators = createMultipleResponseDtoTypes(response);
  const errorExceptionResponseDecorators =
    createMultipleErrorExceptionResponseDtoTypes(errorExceptionResponse);

  const methodDecorators = [
    ...tagDecorators,
    ...consumesDecorators,
    ...headerDecorators,
    ...paramDecorators,
    ...queryDecorators,
    ...bodyDecorator,
    ...responseDecorators,
    ...errorExceptionResponseDecorators,
  ];

  return applyDecorators(
    ApiOperation({ summary, description }),
    ...methodDecorators,
  );
};
