import { CqrsModule, QueryHandler } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { RewardController } from './interface/reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpClientModule } from 'src/common/http-client/http-client.module';
import { AdsReceiveUserEntity } from './infra/db/entity/adsReceiveUser.entity';
import { AdsEntity } from 'src/advertisement/infra/db/entity/ads.entity';
import { AdsRepository } from 'src/advertisement/infra/db/repository/ads.repository';
import { SaveAdRewardHandler } from './application/command/save-ad-reward.handler';
import { RewardRepository } from './infra/db/repository/reward.repository';
import { RewardEntity } from './infra/db/entity/reward.entity';
import { AggUserRewardEntity } from './infra/db/entity/aggUserReward.entity';
import { DeductionRewardHandler } from './application/command/deduction-ad-reward.handler';
import { GetRewardListHandler } from './application/query/get-reward-list.handler';
import { GetRewardTotalCountHandler } from './application/query/get-reward-total-count.handler';

const commandHandlers = [SaveAdRewardHandler, DeductionRewardHandler];

const queryHandlers = [GetRewardListHandler, GetRewardTotalCountHandler];

const repositories = [
  { provide: 'RewardRepository', useClass: RewardRepository },
  { provide: 'AdsRepository', useClass: AdsRepository },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdsEntity,
      AdsReceiveUserEntity,
      RewardEntity,
      AggUserRewardEntity,
    ]),
    CqrsModule,
    HttpClientModule,
  ],
  controllers: [RewardController],
  providers: [...repositories, ...commandHandlers, ...queryHandlers],
})
export class RewardModule {}
