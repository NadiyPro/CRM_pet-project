import { Injectable, Logger } from '@nestjs/common';
import { RefreshTokenEntity } from '../../../infrastructure/mysql/entities/refresh-token.entity';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class RemiveOldRefreshToken {
  private readonly logger = new Logger(RemiveOldRefreshToken.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron('0 0 * * *') // щодня рівно о 12 ночі
  async handleCron() {
    this.logger.log('Cron refresh token clean.');

    const result = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(RefreshTokenEntity)
      .where('exp < :now', { now: new Date() })
      .execute();

    this.logger.log(`Deleted ${result.affected} exp refresh tokens with cron`);
  }
}
