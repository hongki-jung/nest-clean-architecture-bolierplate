import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'ad_db', name: 'ad_campaigns' })
export class AdsEntity {
  @PrimaryColumn('int', { type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 50, name: 'name' })
  name: string;

  @Column('varchar', { length: 50, name: 'image_url' })
  imageUrl: string;

  @Column({ length: 50, name: 'landing_url' })
  landingUrl: string;

  @Column({ name: 'target_country' })
  targetCountry: string;

  @Column({ name: 'target_gender' })
  targetGender: string;

  @Column({ name: 'weight' })
  weight: number;

  @Column({ name: 'reward' })
  reward: number;
}
