import { ICommand } from '@nestjs/cqrs';

export class DeductionRewardCommand implements ICommand {
  constructor(readonly userId: number, readonly usedReward: number) {}
}
