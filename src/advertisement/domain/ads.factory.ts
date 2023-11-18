import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Ads } from './ads';

@Injectable()
export class AdsFactory {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  create(
    id: number,
    name: string,
    imageUrl: string,
    landingUrl: string,
    targetCountry: string,
    targetGender: string,
    reward: number,
    weight: number,
  ) {
    return new Ads(
      id,
      name,
      imageUrl,
      landingUrl,
      targetCountry,
      targetGender,
      reward,
      weight,
    );
  }
}
