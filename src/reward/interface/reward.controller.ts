import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GenerateSwaggerApiDoc } from 'src/common/decorators/generate-swagger-api-doc.decorator';
import { SaveAdRewardDto } from './dto/save-ad-reward.dto';
import { SaveAdRewardCommand } from '../application/command/save-ad-reward.command';
import { DeductionRewardDto } from './dto/deduction-reward.dto';
import { DeductionRewardCommand } from '../application/command/deduction-ad-reward.command';
import { GetRewardListDto } from './dto/get-reward-list.dto';
import { GetRewardListQuery } from '../application/query/get-reward-list.query';
import { GetRewardTotalCountQuery } from '../application/query/get-reward-total-count.query';

@Controller('reward')
export class RewardController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('')
  @GenerateSwaggerApiDoc({
    tags: ['Reward'],
    summary: '리워드 적립',
    description: '리워드 적립',
    response: [{ status: HttpStatus.OK, responseType: null }],
  })
  async saveAdReward(@Body() dto: SaveAdRewardDto) {
    const { userId, adId } = dto;
    const command = new SaveAdRewardCommand(userId, adId);
    return this.commandBus.execute(command);
  }

  @Put('/deduction')
  @GenerateSwaggerApiDoc({
    tags: ['Reward'],
    summary: '리워드 차감',
    description: '리워드 차감',
    response: [{ status: HttpStatus.OK, responseType: null }],
  })
  async deductionReward(@Body() dto: DeductionRewardDto) {
    const { userId, usedReward } = dto;
    const command = new DeductionRewardCommand(userId, usedReward);
    return this.commandBus.execute(command);
  }

  @Get('')
  @GenerateSwaggerApiDoc({
    tags: ['Reward'],
    summary: '리워드 내역 조회',
    description: '리워드 내역 조회',
    response: [{ status: HttpStatus.OK, responseType: null }],
  })
  async getRewardList(@Query() dto: GetRewardListDto) {
    const { userId } = dto;
    const command = new GetRewardListQuery(userId);
    return this.queryBus.execute(command);
  }

  @Get('/tatal')
  @GenerateSwaggerApiDoc({
    tags: ['Reward'],
    summary: '리워드 잔액',
    description: '리워드 잔액',
    response: [{ status: HttpStatus.OK, responseType: null }],
  })
  async getRewardTotalCount(@Query() dto: GetRewardListDto) {
    const { userId } = dto;
    const command = new GetRewardTotalCountQuery(userId);
    return this.queryBus.execute(command);
  }
}
