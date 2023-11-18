import { IQuery } from '@nestjs/cqrs';

export class GetRewardListQuery implements IQuery {
  constructor(readonly userId: number) {}
}
