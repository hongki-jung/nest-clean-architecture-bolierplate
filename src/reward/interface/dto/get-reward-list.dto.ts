import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetRewardListDto {
  @ApiProperty({
    name: 'userId',
    description: '유저Id',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  userId: number;
}
