import { Injectable, Logger } from '@nestjs/common';
import { RefreshTokenEntity } from '../../../infrastructure/mysql/entities/refresh-token.entity';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class CronOldRefreshToken {
  private readonly logger = new Logger(CronOldRefreshToken.name);
  // щоб вивести повідомлення в консоль через вбудований в Nest сервіс new Logger

  constructor(private readonly dataSource: DataSource) {}

  @Cron('0 0 * * *') // раз на добу 0 0 * * * (для тесту щогодини о */20 хвилині)
  async handleCron() {
    await this.dataSource
      .createQueryBuilder() //кажемо що будемо створювати SQL запит
      .delete() // будемо використовувати метод delete
      .from(RefreshTokenEntity) // застосовувати для таблиці
      .where('exp <= NOW()')
      .execute(); // запускаємо

    this.logger.log(`Deleted exp refresh tokens with cron`);
  }
}
