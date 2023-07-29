import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Between, FindOperator, Repository } from 'typeorm';
import { CollectionEntity } from '../entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionDto } from '../dtos/collection.dto';
import { FilterDto } from '../dtos/filter.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
  ) {}

  async save(entity: CollectionDto): Promise<CollectionEntity> {
    const exists = await this.collectionRepository.exist({
      where: {
        id: entity.id,
      },
    });
    if (exists) {
      throw new UnprocessableEntityException('Collection already registered!');
    }
    return await this.collectionRepository.save(entity);
  }

  async getOne(id: string) {
    const collection = await this.collectionRepository.findOne({
      where: { id },
    });
    collection.dayOne = `${collection.dayOne}%`;
    collection.daySeven = `${collection.daySeven}%`;
    collection.dayThirty = `${collection.dayThirty}%`;
    return collection;
  }

  async getAll() {
    return await this.collectionRepository.find();
  }

  async getAverage(filter?: FilterDto) {
    let createdAt: Date | FindOperator<Date>;
    if (filter) {
      createdAt = filter.equal
        ? filter.equal.creationAt
        : Between(filter.between.firstDate, filter.between.lastDate);
    }
    const collections = await this.collectionRepository.find({
      where: { createdAt },
    });
    let prices = 0;
    let lessValuablePrice = 10;
    let moreValuablePrice = 0;
    collections.forEach((collection) => {
      prices += collection.dayThirtyFloorSaleChange;
      console.log({ prices, saleChange: collection.dayThirtyFloorSaleChange });
      if (collection.dayThirtyFloorSaleChange > moreValuablePrice) {
        moreValuablePrice = collection.dayThirtyFloorSaleChange;
      }
      if (collection.dayThirtyFloorSaleChange < lessValuablePrice) {
        lessValuablePrice = collection.dayThirtyFloorSaleChange;
      }
    });
    const priceAverage = prices / collections.length;
    return {
      priceAverage,
      lessValuablePrice,
      moreValuablePrice,
    };
  }

  async update(id: string, collectionSave: Partial<CollectionEntity>) {
    await this.collectionRepository.update(id, collectionSave);
  }
}
