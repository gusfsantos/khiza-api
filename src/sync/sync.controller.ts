import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SyncService } from './sync.service';

@Controller('sync')
@UseGuards(AuthGuard)
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post()
  async getAll() {
    return await this.syncService.getAll();
  }
}
