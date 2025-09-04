import { Injectable, Logger } from '@nestjs/common';
import { RefreshTokenEntity } from '../../../infrastructure/mysql/entities/refresh-token.entity';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class RemiveOldRefreshToken {
  private readonly logger = new Logger(RemiveOldRefreshToken.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron('*/20 * * * *') // поставила для тесту щогодини о */20 хвилині, потім поставлю раз на добу 0 0 * * *
  async handleCron() {
    const result = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(RefreshTokenEntity)
      .where('exp <= NOW()')
      .execute();

    this.logger.log(`Deleted ${result.affected} exp refresh tokens with cron`);
  }
}
