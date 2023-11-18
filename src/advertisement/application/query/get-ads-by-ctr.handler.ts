import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ads } from 'src/advertisement/domain/ads';
import { plainToInstance } from 'class-transformer';
import { GetAdsByCtrQuery } from './get-ads-by-ctr.query';
import { ICtrService } from '../adapter/ictr.service';
import { IAdsRepository } from 'src/advertisement/domain/repository/iads.repository';

@QueryHandler(GetAdsByCtrQuery)
export class GetAdsByCtrQueryHandler
  implements IQueryHandler<GetAdsByCtrQuery>
{
  constructor(
    @Inject('AdsRepository') private adsRepository: IAdsRepository,
    @Inject('CtrService') private ctrService: ICtrService,
  ) {}

  async execute(query: GetAdsByCtrQuery): Promise<Ads[]> {
    const { userId, gender, country } = query;
    const ads = await this.adsRepository.findByGenderAndCountry(
      gender,
      country,
    );
    // ads 에서 id 추출
    const adsIds = ads.map((ad) => ad.id);
    // ctr 예측
    const { pctr } = await this.ctrService.predictCtr(userId, adsIds);
    // ctr 기준으로 내림차순 정렬
    const sortedAds = this._sortAdsByPctr(ads, adsIds, pctr);

    // 광고 노출 기록 저장
    await this.adsRepository.saveAdsReceiceUser(userId, adsIds);

    return plainToInstance(Ads, sortedAds);
  }

  // ctr 기준으로 내림차순 정렬
  private _sortAdsByPctr(ads: Ads[], adsIds: number[], pctr: number[]): Ads[] {
    // pctr 순서대로 adsIds 정렬
    const sortedAdsIds = adsIds.sort((a, b) => {
      const indexA = adsIds.indexOf(a);
      const indexB = adsIds.indexOf(b);
      return pctr[indexB] - pctr[indexA];
    });

    // adsIds 순서대로 ads 정렬
    const sortedAds = sortedAdsIds.map((adId) => {
      return ads.find((ad) => ad.id === adId);
    });
    return sortedAds;
  }
}
