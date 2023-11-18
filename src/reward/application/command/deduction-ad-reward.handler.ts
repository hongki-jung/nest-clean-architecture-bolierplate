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
import { DeductionRewardCommand } from './deduction-ad-reward.command';

@Injectable()
@CommandHandler(DeductionRewardCommand)
export class DeductionRewardHandler
  implements ICommandHandler<DeductionRewardCommand>
{
  constructor(
    @Inject('RewardRepository') private rewardRepository: IRewardRepository,
    @Inject('AdsRepository') private adsRepository: IAdsRepository,
  ) {}

  async execute(command: DeductionRewardCommand): Promise<void> {
    const { userId, usedReward } = command;
    await this.rewardRepository.deduction(userId, usedReward);
  }
}
