// import { Ads } from '../reward';

export interface IRewardRepository {
  // findOne: (userId: number) => Promise<any>;
  save: (userId: number, adId: number, reward: number) => Promise<void>;
  deduction: (userId: number, usedReward: number) => Promise<void>;
  findByUserId: (userId: number) => Promise<any>;
  findTotalCountByUserId: (userId: number) => Promise<any>;
  // findByGenderAndCountry: (gender: string, country: string) => Promise<Ads[]>;
  // saveAdsReceiceUser: (userId: number, adsId: number[]) => Promise<void>;
}
