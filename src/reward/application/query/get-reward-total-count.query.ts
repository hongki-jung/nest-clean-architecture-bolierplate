import { IQuery } from '@nestjs/cqrs';

export class GetRewardTotalCountQuery implements IQuery {
  constructor(readonly userId: number) {}
}
