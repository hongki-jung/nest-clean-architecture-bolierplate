import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAdRewardDto {
  @ApiProperty({
    name: 'adId',
    description: '광고Id',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  adId: number;

  @ApiProperty({
    name: 'reward',
    description: '리워드',
    required: true,
    example: 44,
  })
  @IsNotEmpty()
  @IsNumber()
  reward: number;
}
