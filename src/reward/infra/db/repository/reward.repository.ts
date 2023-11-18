import { AdsRepository } from '../../../../advertisement/infra/db/repository/ads.repository';
import { RewardEntity } from '../entity/reward.entity';
import { DataSource, Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { IRewardRepository } from 'src/reward/domain/repository/ireward.repository';
import { AggUserRewardEntity } from '../entity/aggUserReward.entity';
import { RuntimeException } from 'src/common/exceptions/runtime.exception';
import { Reward } from 'src/reward/domain/reward';

@Injectable()
export class RewardRepository implements IRewardRepository {
  constructor(
    dataSouce: DataSource,
    @InjectRepository(RewardEntity)
    private rewardRepository: Repository<RewardEntity>,
    @InjectRepository(AggUserRewardEntity)
    private aggUserRewardRepository: Repository<AggUserRewardEntity>,
  ) {}

  async findTotalCountByUserId(userId: number) {
    const aggUserRewardEntity = await this.aggUserRewardRepository.findOne({
      where: { userId },
    });
    if (!aggUserRewardEntity) {
      throw new RuntimeException('리워드 잔액이 없습니다.');
    }
    return aggUserRewardEntity.rewardSum;
  }

  async findByUserId(userId: number) {
    const rewardsEntity = await this.rewardRepository.find({
      where: { userId },
    });
    if (!rewardsEntity) {
      throw new RuntimeException('리워드가 없습니다.');
    }
    return plainToInstance(Reward, rewardsEntity);
  }

  async save(userId: number, adId: number, reward: number) {
    await this.rewardRepository.save({ userId, adId, reward });

    const aggUserRewardEntity = await this.aggUserRewardRepository.findOne({
      where: { userId },
    });
    if (!aggUserRewardEntity) {
      await this.aggUserRewardRepository.save({ userId, rewardSum: reward });
    } else {
      await this.aggUserRewardRepository.update(
        { userId },
        { rewardSum: aggUserRewardEntity.rewardSum + reward },
      );
    }
  }

  async deduction(userId: number, usedReward: number) {
    const aggUserRewardEntity = await this.aggUserRewardRepository.findOne({
      where: { userId },
    });
    if (!aggUserRewardEntity) {
      return;
    }
    if (aggUserRewardEntity.rewardSum < usedReward) {
      throw new RuntimeException('보유한 리워드가 부족합니다.');
    }
    await this.rewardRepository.save({
      userId,
      reward: -usedReward,
      isEarned: 0,
    });
    await this.aggUserRewardRepository.update(
      { userId },
      { rewardSum: aggUserRewardEntity.rewardSum - usedReward },
    );
  }
}
