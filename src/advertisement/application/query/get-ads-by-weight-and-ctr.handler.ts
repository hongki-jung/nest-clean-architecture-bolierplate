import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ads } from 'src/advertisement/domain/ads';
import { plainToInstance } from 'class-transformer';
import { IAdsRepository } from 'src/advertisement/domain/repository/iads.repository';
import { GetAdsByWeightAndCtrQuery } from './get-ads-by-weight-and-ctr.query';
import { ICtrService } from '../adapter/ictr.service';

@QueryHandler(GetAdsByWeightAndCtrQuery)
export class GetAdsByWeightAndCtrQueryHandler
  implements IQueryHandler<GetAdsByWeightAndCtrQuery>
{
  constructor(
    @Inject('AdsRepository') private adsRepository: IAdsRepository,
    @Inject('CtrService') private ctrService: ICtrService,
  ) {}

  async execute(query: GetAdsByWeightAndCtrQuery): Promise<Ads[]> {
    const { userId, gender, country } = query;
    const ads = await this.adsRepository.findByGenderAndCountry(
      gender,
      country,
    );
    // ads 에서 id 추출
    const adsIds = ads.map((ad) => ad.id);

    // ctr 예측
    const { pctr } = await this.ctrService.predictCtr(userId, adsIds);

    // 정렬에 ctr과 weight를 함께 사용
    const sortedAds = this._sortAdsByCtrAndWeight(ads, adsIds, pctr);

    // 광고 노출 기록 저장
    await this.adsRepository.saveAdsReceiceUser(userId, adsIds);

    return plainToInstance(Ads, sortedAds);
  }

  // 정렬에 ctr과 weight를 함께 사용
  private _sortAdsByCtrAndWeight(
    ads: Ads[],
    adsIds: number[],
    pctr: number[],
  ): Ads[] {
    // pctr 순서대로 adsIds 정렬
    const sortedAdsIds = adsIds.sort((a, b) => {
      const indexA = adsIds.indexOf(a);
      const indexB = adsIds.indexOf(b);
      return pctr[indexB] - pctr[indexA];
    });

    // adsIds 순서대로 ads 정렬
    const sortedByCtr = sortedAdsIds.map((adId) => {
      return ads.find((ad) => ad.id === adId);
    });

    // 예측치가 높은 광고를 제외하곤 weight 순서대로 정렬
    const restOfAds = sortedByCtr.slice(1);
    restOfAds.sort((a, b) => b.weight - a.weight);
    const sortedAds = [sortedByCtr[0], ...restOfAds];

    return sortedAds;
  }
}
