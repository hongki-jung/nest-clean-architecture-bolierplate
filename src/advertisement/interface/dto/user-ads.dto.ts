import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

enum FmTypeEnum {
  F = 'F',
  M = 'M',
}

export class UserAdsDto {
  @ApiProperty({
    name: 'userId',
    description: '유저Id',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    name: 'gender',
    enum: FmTypeEnum,
    description: '성별(F:여성 M:남성)',
    required: true,
    example: 'F',
  })
  @IsNotEmpty()
  @Type(() => String)
  gender: FmTypeEnum;

  @ApiProperty({
    name: 'country',
    description: '국가',
    required: true,
    example: 'KR',
  })
  @IsNotEmpty()
  @Type(() => String)
  country: string;
}
