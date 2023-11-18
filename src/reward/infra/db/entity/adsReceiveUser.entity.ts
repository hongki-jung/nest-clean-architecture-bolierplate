import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { AdsEntity } from './reward.entity';

@Entity({ schema: 'ad_db', name: 'ad_receive_user' })
export class AdsReceiveUserEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'ad_id' })
  adId: number;

  @Column('datetime', { name: 'create_at' })
  createAt: Date;
}
