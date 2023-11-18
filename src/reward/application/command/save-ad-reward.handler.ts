import * as uuid from 'uuid';
import { ulid } from 'ulid';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IAdsRepository } from 'src/advertisement/domain/repository/iads.repository';
import { SaveAdRewardCommand } from './save-ad-reward.command';
import { IRewardRepository } from 'src/reward/domain/repository/ireward.repository';

@Injectable()
@CommandHandler(SaveAdRewardCommand)
export class SaveAdRewardHandler
  implements ICommandHandler<SaveAdRewardCommand>
{
  constructor(
    @Inject('RewardRepository') private rewardRepository: IRewardRepository,
    @Inject('AdsRepository') private adsRepository: IAdsRepository,
  ) {}

  async execute(command: SaveAdRewardCommand): Promise<void> {
    const { userId, adId } = command;
    const ads = await this.adsRepository.findOneById(adId);
    if (!ads) {
      throw new UnprocessableEntityException('광고가 존재하지 않습니다.');
    }
    const receiveAds = await this.adsRepository.checkUserAdsReceive(
      userId,
      adId,
    );
    if (!receiveAds) {
      throw new UnprocessableEntityException('해당 광고를 보지않았습니다.');
    }

    await this.adsRepository.deleteAdsReceiveUser(userId, adId);
    await this.rewardRepository.save(userId, adId, ads.reward);
  }
}
