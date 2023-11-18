export class Reward {
  constructor(
    readonly id: number,
    readonly adId: number,
    readonly rewardAmount: number,
    readonly isEarned: number,
    readonly createAt: Date,
  ) {}

  getId(): Readonly<number> {
    return this.id;
  }
}
