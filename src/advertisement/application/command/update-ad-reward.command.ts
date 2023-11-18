import { ICommand } from '@nestjs/cqrs';

export class UpdateAdRewardCommand implements ICommand {
  constructor(readonly adId: number, readonly reward: number) {}
}
