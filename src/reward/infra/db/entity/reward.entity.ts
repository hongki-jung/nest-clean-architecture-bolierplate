import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'ad_db', name: 'user_reward' })
export class RewardEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'ad_id' })
  adId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'reward_amount' })
  reward: number;

  @Column({ name: 'is_earned' })
  isEarned: number;
}
