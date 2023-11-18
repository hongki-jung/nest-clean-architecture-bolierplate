import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { AdsEntity } from '../../infra/db/entity/reward.entity';
// import { UserInfo } from '../../interface/UserInfo';
// import { GetAdsByWeightQuery } from './get-ads-by-weight.query';
import { Ads } from 'src/advertisement/domain/ads';
import { AdsFactory } from 'src/advertisement/domain/ads.factory';
import { plainToInstance } from 'class-transformer';
import { IAdsRepository } from 'src/advertisement/domain/repository/iads.repository';
import { GetRewardListQuery } from './get-reward-list.query';
import { IRewardRepository } from 'src/reward/domain/repository/ireward.repository';
import { Reward } from 'src/reward/domain/reward';
import { GetRewardTotalCountQuery } from './get-reward-total-count.query';

@QueryHandler(GetRewardTotalCountQuery)
export class GetRewardTotalCountHandler
  implements IQueryHandler<GetRewardTotalCountQuery>
{
  constructor(
    @Inject('RewardRepository') private rewardRepository: IRewardRepository,
  ) {}
  async execute(query: GetRewardTotalCountQuery): Promise<any> {
    const { userId } = query;
    const rewardSum = await this.rewardRepository.findTotalCountByUserId(
      userId,
    );

    return { rewardSum };
  }
}
