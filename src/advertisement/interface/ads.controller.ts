import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserAdsDto } from './dto/user-ads.dto';
import { GenerateSwaggerApiDoc } from 'src/common/decorators/generate-swagger-api-doc.decorator';
import { GetAdsQueryFactory } from '../application/query/get-ads-query.factory';
import { UpdateAdRewardCommand } from '../application/command/update-ad-reward.command';
import { UpdateAdRewardDto } from './dto/update-ad-reward.dto';

@Controller('ads')
export class AdsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('')
  @GenerateSwaggerApiDoc({
    tags: ['Ads'],
    summary: '광고 호출',
    description: '광고 호출',
    response: [{ status: HttpStatus.OK, responseType: null }],
  })
  async getAdvertisement(@Query() dto: UserAdsDto) {
    const { userId, gender, country } = dto;

    const queryFactory = new GetAdsQueryFactory();
    const command = queryFactory.createQuery(userId, gender, country);

    const result = await this.queryBus.execute(command);
    return result;
  }

  @Put(':adId/reward')
  @GenerateSwaggerApiDoc({
    tags: ['Ads'],
    summary: '광고 리워드 값 수정',
    description: '광고 리워드 값 수정',
    response: [{ status: HttpStatus.OK, responseType: null }],
  })
  async updateAdReward(
    @Param('adId') adId: number,
    @Body() dto: UpdateAdRewardDto,
  ) {
    const { reward } = dto;
    const command = new UpdateAdRewardCommand(adId, reward);
    const result = await this.commandBus.execute(command);
    return result;
  }
}
