import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAdsByWeightQuery } from './get-ads-by-weight.query';
import { Ads } from 'src/advertisement/domain/ads';
import { IAdsRepository } from 'src/advertisement/domain/repository/iads.repository';

@QueryHandler(GetAdsByWeightQuery)
export class GetAdsByWeightQueryHandler
  implements IQueryHandler<GetAdsByWeightQuery>
{
  constructor(@Inject('AdsRepository') private adsRepository: IAdsRepository) {}
  async execute(query: GetAdsByWeightQuery): Promise<Ads[]> {
    const { userId, gender, country } = query;
    const ads = await this.adsRepository.findByGenderAndCountry(
      gender,
      country,
    );
    // ads 에서 id 추출
    const adsIds = ads.map((ad) => ad.id);
    // 광고 노출 기록 저장
    await this.adsRepository.saveAdsReceiceUser(userId, adsIds);

    const sortAdsByweight = ads.sort((a, b) => b.weight - a.weight);
    return sortAdsByweight;
  }
}
