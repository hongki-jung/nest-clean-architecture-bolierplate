import { IQuery } from '@nestjs/cqrs';

export class GetAdsByWeightAndCtrQuery implements IQuery {
  constructor(
    readonly userId: number,
    readonly gender: string,
    readonly country: string,
  ) {}
}
