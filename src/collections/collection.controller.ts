import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionDto } from '../dtos/collection.dto';
import { FilterDto } from '../dtos/filter.dto';
import { filterDate } from '../utils/filter-date';
import { AuthGuard } from '../auth/auth.guard';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async save(@Body() dto: CollectionDto) {
    if (!dto.id) {
      throw new UnprocessableEntityException(
        'Needs to pass the id of the currency!',
      );
    }
    return await this.collectionService.save(dto);
  }

  @Get()
  async getAll(@Query('creationAt') creation: string) {
    let filter: FilterDto;
    if (creation) {
      filter = filterDate(creation);
    }
    return await this.collectionService.getAverage(filter);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.collectionService.getOne(id);
  }
}
