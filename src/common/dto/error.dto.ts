import { ApiProperty } from '@nestjs/swagger';

export class ErrorExceptionDto {
  @ApiProperty({ description: '코드', example: 0 })
  code: number;

  @ApiProperty({ description: '상태 값', example: 500 })
  status: number;

  @ApiProperty({ description: '메시지', example: '' })
  message: string;

  backtrace?: string | undefined;
}
