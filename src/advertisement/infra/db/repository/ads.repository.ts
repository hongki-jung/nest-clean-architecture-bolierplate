import { AdsEntity } from './../entity/ads.entity';
import { DataSource, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAdsRepository } from 'src/advertisement/domain/repository/iads.repository';

import { plainToInstance } from 'class-transformer';
import { Ads } from 'src/advertisement/domain/ads';
import { AdsReceiveUserEntity } from '../entity/adsReceiveUser.entity';

@Injectable()
export class AdsRepository implements IAdsRepository {
  constructor(
    @InjectRepository(AdsEntity)
    private adsRepository: Repository<AdsEntity>,
    @InjectRepository(AdsReceiveUserEntity)
    private adsReceiveUserRepository: Repository<AdsReceiveUserEntity>,
  ) {}

  async findOneById(adId: number): Promise<Ads | null> {
    const adsEntity = await this.adsRepository.findOne({ where: { id: adId } });
    if (!adsEntity) {
      return null;
    }
    return plainToInstance(Ads, adsEntity);
  }

  async checkUserAdsReceive(userId: number, adId: number): Promise<boolean> {
    const adsReceiveUserEntity = await this.adsReceiveUserRepository.findOne({
      where: { userId, adId },
    });
    if (!adsReceiveUserEntity) {
      return false;
    }
    return true;
  }

  async deleteAdsReceiveUser(userId: number, adId: number): Promise<void> {
    await this.adsReceiveUserRepository.delete({ userId, adId });
  }

  async findByGenderAndCountry(
    gender: string,
    country: string,
  ): Promise<Ads[]> {
    const adsEntity = await this.adsRepository
      .createQueryBuilder('ad_campaigns')
      .where('ad_campaigns.targetGender = :gender', { gender })
      .andWhere('ad_campaigns.targetCountry = :country', { country })
      .limit(3)
      .getMany();

    return plainToInstance(Ads, adsEntity);
  }

  async saveAdsReceiceUser(userId: number, adIds: number[]): Promise<void> {
    const adReceiveUser: AdsReceiveUserEntity[] = [];
    adIds.forEach((adId) => {
      const adsReceiveUser = new AdsReceiveUserEntity();
      adsReceiveUser.userId = userId;
      adsReceiveUser.adId = adId;
      adReceiveUser.push(adsReceiveUser);
    });
    await this.adsReceiveUserRepository.save(adReceiveUser);
  }

  async updateAdReward(adId: number, reward: number): Promise<void> {
    const adEntity = await this.adsRepository.findOne({ where: { id: adId } });
    if (!adEntity) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    adEntity.reward = reward;
    await this.adsRepository.save(adEntity);
  }
}
