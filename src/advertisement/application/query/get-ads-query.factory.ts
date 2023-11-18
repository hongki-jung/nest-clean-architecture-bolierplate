import { GetAdsByCtrQuery } from './get-ads-by-ctr.query';
import { GetAdsByRandomQuery } from './get-ads-by-random.query';
import { GetAdsByWeightAndCtrQuery } from './get-ads-by-weight-and-ctr.query';
import { GetAdsByWeightQuery } from './get-ads-by-weight.query';

export class GetAdsQueryFactory {
  createQuery(userId: number, gender: string, country: string) {
    const queryMap = {
      0: () => new GetAdsByRandomQuery(userId, gender, country),
      1: () => new GetAdsByWeightQuery(userId, gender, country),
      2: () => new GetAdsByCtrQuery(userId, gender, country),
      3: () => new GetAdsByWeightAndCtrQuery(userId, gender, country),
    };
    const userGroup = userId % Object.keys(queryMap).length;

    const createQueryFn = queryMap[userGroup] || queryMap[0];
    return createQueryFn();
  }
}
