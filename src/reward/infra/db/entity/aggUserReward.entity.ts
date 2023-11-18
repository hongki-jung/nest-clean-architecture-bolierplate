import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { AdsEntity } from './reward.entity';

@Entity({ schema: 'ad_db', name: 'agg_user_reward' })
export class AggUserRewardEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'reward_sum' })
  rewardSum: number;
}
