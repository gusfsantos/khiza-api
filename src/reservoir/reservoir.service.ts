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
    const requests: Promise<AxiosResponse<CollectionSyncDto>>[] = [];
    ids.map((id) => {
      requests.push(this.http.axiosRef.get<CollectionSyncDto>(`?id=${id}`));
    });

    return await Promise.all(requests);
  }
}
