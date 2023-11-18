import { CqrsModule, QueryHandler } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { AdsController } from './interface/ads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsEntity } from './infra/db/entity/ads.entity';
import { AdsRepository } from './infra/db/repository/ads.repository';

import { AdsFactory } from './domain/ads.factory';
import { GetAdsByWeightQueryHandler } from './application/query/get-ads-by-weight.handler';
import { GetAdsByRandomQueryHandler } from './application/query/get-ads-by-random.handler';

import { CtrService } from './infra/adapter/ctr.service';
import { HttpClientModule } from 'src/common/http-client/http-client.module';

import { GetAdsByCtrQueryHandler } from './application/query/get-ads-by-ctr.handler';
import { GetAdsByWeightAndCtrQueryHandler } from './application/query/get-ads-by-weight-and-ctr.handler';

import { AdsReceiveUserEntity } from './infra/db/entity/adsReceiveUser.entity';
import { UpdateAdRewardCommandHandler } from './application/command/update-ad-reward.handler';

const commandHandlers = [UpdateAdRewardCommandHandler];

const queryHandlers = [
  GetAdsByWeightQueryHandler,
  GetAdsByRandomQueryHandler,
  GetAdsByCtrQueryHandler,
  GetAdsByWeightAndCtrQueryHandler,
];

const repositories = [
  { provide: 'AdsRepository', useClass: AdsRepository },
  { provide: 'CtrService', useClass: CtrService },
];

const factories = [AdsFactory];

@Module({
  imports: [
    TypeOrmModule.forFeature([AdsEntity, AdsReceiveUserEntity]),
    CqrsModule,
    HttpClientModule,
  ],
  controllers: [AdsController],
  providers: [
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...factories,
  ],
})
export class AdsModule {}
