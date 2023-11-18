import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeductionRewardDto {
  @ApiProperty({
    name: 'userId',
    description: '유저Id',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    name: 'usedReward',
    description: '유저가 사용한 리워드 양',
    required: true,
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  usedReward: number;
}
