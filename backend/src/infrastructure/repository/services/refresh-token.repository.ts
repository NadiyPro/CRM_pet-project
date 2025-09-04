import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../../mysql/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.manager);
  }

  public async isRefreshTokenExist(
    userId: string,
    deviceId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const token = await this.findOneBy({
      user_id: userId,
      deviceId,
      refreshToken,
    });

    if (!token) return false;

    if (token.exp < new Date()) {
      return false;
    }

    return !!token;
  }
}
