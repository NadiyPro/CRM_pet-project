import { ConfigService } from '@nestjs/config/dist/config.service';
import { Config } from '../../../configs/config.type';
import { RedisService } from '../../../infrastructure/redis/services/redis.service';
export declare class AuthCacheService {
    private readonly redisService;
    private readonly configService;
    [x: string]: any;
    private jwtConfig;
    constructor(redisService: RedisService, configService: ConfigService<Config>);
    saveToken(token: string, userId: string, deviceId: string): Promise<void>;
    saveActiveToken(token: string, userId: string): Promise<void>;
    isAccessTokenExist(userId: string, deviceId: string, token: string): Promise<boolean>;
    deleteToken(userId: string, deviceId: string): Promise<void>;
    private getKey;
    deleteTokenUserId(userId: string): Promise<void>;
}
