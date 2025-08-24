import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../../mysql/entities/refresh-token.entity';

// @Injectable()
// export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
//   constructor(private readonly dataSource: DataSource) {
//     super(RefreshTokenEntity, dataSource.manager);
//   }
//
//   // public async isRefreshTokenExist(refreshToken: string): Promise<boolean> {
//   //   return this.existsBy({ refreshToken });
//   // }
//   public async isRefreshTokenExist(refreshToken: string): Promise<boolean> {
//     const token = await this.findOneBy({ refreshToken });
//     return !!token;
//   }
// }
// @Injectable()
// export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
//   constructor(private readonly dataSource: DataSource) {
//     super(RefreshTokenEntity, dataSource.manager);
//   }
//
//   public async isRefreshTokenExist(
//     userId: string,
//     deviceId: string,
//     refreshToken: string,
//   ): Promise<boolean> {
//     const token = await this.findOneBy({
//       user_id: userId,
//       deviceId,
//       refreshToken,
//     });
//     return !!token;
//   }
// }
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
    return !!token;
  }
}
