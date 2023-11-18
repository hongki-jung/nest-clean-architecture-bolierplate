import { ICommand } from '@nestjs/cqrs';

export class SaveAdRewardCommand implements ICommand {
  constructor(readonly userId: number, readonly adId: number) {}
}
