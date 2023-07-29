import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CollectionEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  slug?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  discordUrl?: string;

  @Column('float', { nullable: true })
  dayOne?: number | string;

  @Column('float', { nullable: true })
  daySeven?: number | string;

  @Column('float', { nullable: true })
  dayThirty?: number | string;

  @Column('float', { nullable: true })
  dayThirtyFloorSaleChange?: number;

  @Column({ nullable: true })
  createdAt: Date;
}
