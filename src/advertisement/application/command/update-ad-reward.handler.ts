import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IAdsRepository } from 'src/advertisement/domain/repository/iads.repository';
import { UpdateAdRewardCommand } from './update-ad-reward.command';

@Injectable()
@CommandHandler(UpdateAdRewardCommand)
export class UpdateAdRewardCommandHandler
  implements ICommandHandler<UpdateAdRewardCommand>
{
  constructor(@Inject('AdsRepository') private adsRepository: IAdsRepository) {}

  async execute(command: UpdateAdRewardCommand): Promise<void> {
    const { adId, reward } = command;
    await this.adsRepository.updateAdReward(adId, reward);
  }
}
