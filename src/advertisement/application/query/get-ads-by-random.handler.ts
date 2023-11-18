import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdsEntity } from '../../infra/db/entity/ads.entity';
// import { UserInfo } from '../../interface/UserInfo';
import { GetAdsByWeightQuery } from './get-ads-by-weight.query';
import { Ads } from 'src/advertisement/domain/ads';
import { AdsFactory } from 'src/advertisement/domain/ads.factory';
import { GetAdsByRandomQuery } from './get-ads-by-random.query';
import { IAdsRepository } from 'src/advertisement/domain/repository/iads.repository';

@QueryHandler(GetAdsByRandomQuery)
export class GetAdsByRandomQueryHandler
  implements IQueryHandler<GetAdsByRandomQuery>
{
  constructor(@Inject('AdsRepository') private adsRepository: IAdsRepository) {}

  async execute(query: GetAdsByRandomQuery): Promise<Ads[]> {
    const { userId, gender, country } = query;
    const ads = await this.adsRepository.findByGenderAndCountry(
      gender,
      country,
    );
    // ads 에서 id 추출
    const adsIds = ads.map((ad) => ad.id);

    // 광고 노출 기록 저장
    await this.adsRepository.saveAdsReceiceUser(userId, adsIds);

    return this._randomOrder(ads);
  }

  private _randomOrder(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
