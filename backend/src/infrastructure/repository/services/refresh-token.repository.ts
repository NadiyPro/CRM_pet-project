import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../../mysql/entities/refresh-token.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.manager);
  }

  public async isRefreshTokenExist(refreshToken: string): Promise<boolean> {
    return await this.existsBy({ refreshToken });
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { RefreshTokenEntity } from '../../mysql/entities/refresh-token.entity';
//
// @Injectable()
// export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
//   constructor(
//     @InjectRepository(RefreshTokenEntity)
//     private readonly repository: Repository<RefreshTokenEntity>,
//   ) {
//     super(repository.target, repository.manager, repository.queryRunner);
//   }
//
//   public async isRefreshTokenExist(refreshToken: string): Promise<boolean> {
//     return !!(await this.repository.findOne({ where: { refreshToken } }));
//   }
// }
