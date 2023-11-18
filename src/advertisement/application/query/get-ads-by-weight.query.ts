import { IQuery } from '@nestjs/cqrs';

export class GetAdsByWeightQuery implements IQuery {
  constructor(
    readonly userId: number,
    readonly gender: string,
    readonly country: string,
  ) {}
}
