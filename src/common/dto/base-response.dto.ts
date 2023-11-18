import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty({
    name: 'code',
    type: String,
    nullable: false,
    description: 'code',
    example: 'E000',
  })
  code: string;

  @ApiProperty({
    name: 'message',
    nullable: false,
    description: 'message',
    example: '',
  })
  message: string;

  @ApiProperty({
    name: 'data',
    type: 'object',
    description: 'data',
    example: {},
  })
  data: T;
}
