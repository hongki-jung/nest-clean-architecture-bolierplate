import { Ads } from '../ads';

export interface IAdsRepository {
  findOneById: (adId: number) => Promise<Ads | null>;
  checkUserAdsReceive: (userId: number, adId: number) => Promise<boolean>;
  deleteAdsReceiveUser: (userId: number, adId: number) => Promise<void>;
  findByGenderAndCountry: (gender: string, country: string) => Promise<Ads[]>;
  saveAdsReceiceUser: (userId: number, adsId: number[]) => Promise<void>;
  updateAdReward: (adId: number, reward: number) => Promise<void>;
}
