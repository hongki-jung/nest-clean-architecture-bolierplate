import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
