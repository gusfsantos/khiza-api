import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CollectionSyncDto } from '../dtos/collection-sync.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class ReservoirService {
  constructor(private readonly http: HttpService) {}

  async get() {
    const result = await this.http.axiosRef.get<CollectionSyncDto>('');
    console.log(result);
    return result.data;
  }

  async getMany(ids: string[]) {
    const requests: CollectionSyncDto[] = [];
    for (const id of ids) {
      const collections = await this.http.axiosRef.get<CollectionSyncDto>(
        `?id=${id}`,
      );
      requests.push(collections.data);
    }

    return requests;
  }
}
