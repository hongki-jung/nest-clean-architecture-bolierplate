import { IQuery } from '@nestjs/cqrs';

export class GetAdsByRandomQuery implements IQuery {
  constructor(
    readonly userId: number,
    readonly gender: string,
    readonly country: string,
  ) {}
}
