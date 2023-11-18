import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaveAdRewardDto {
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
    name: 'adId',
    description: '광고Id',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  adId: number;
}
