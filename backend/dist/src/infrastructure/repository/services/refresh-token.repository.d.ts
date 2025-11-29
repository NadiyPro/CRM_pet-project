import { DataSource, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../../mysql/entities/refresh-token.entity';
export declare class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    isRefreshTokenExist(userId: string, deviceId: string, refreshToken: string): Promise<boolean>;
}
