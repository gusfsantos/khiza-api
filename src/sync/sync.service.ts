import { Injectable } from '@nestjs/common';
import { ReservoirService } from '../reservoir/reservoir.service';
import { CollectionsService } from '../collections/collections.service';
import { CollectionEntity } from '../entities/collection.entity';

@Injectable()
export class SyncService {
  constructor(
    private readonly reservoirService: ReservoirService,
    private readonly collectionService: CollectionsService,
  ) {}

  async getAll() {
    const collections = await this.collectionService.getAll();
    const ids = collections.map((x) => x.id);
    const syncs = await this.reservoirService.getMany(ids);

    const collectionsSync = Array.from(new Set(syncs));
    const collectionsToUpdate: Promise<void>[] = [];
    collectionsSync.map((data) => {
      const collection = data.data.collections[0];
      const collectionSave: Partial<CollectionEntity> = {
        dayThirtyFloorSaleChange: collection.floorSaleChange['30day'],
        dayThirty: collection.floorSale['30day'],
        dayOne: collection.floorSale['1day'],
        daySeven: collection.floorSale['7day'],
        name: collection.name,
        createdAt: collection.createdAt,
        slug: collection.slug,
        image: collection.image,
        discordUrl: collection.discordUrl,
      };
      collectionsToUpdate.push(
        this.collectionService.update(collection.id, collectionSave),
      );
    });

    await Promise.all(collectionsToUpdate);
  }
}
