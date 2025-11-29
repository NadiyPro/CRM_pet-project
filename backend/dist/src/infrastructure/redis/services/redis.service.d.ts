import { Redis } from 'ioredis';
export declare class RedisService {
    private readonly redisClient;
    [x: string]: any;
    constructor(redisClient: Redis);
    addOneToSet(hash: string, value: string): Promise<number>;
    remOneFromSet(key: string, setMember: string): Promise<number>;
    deleteByKey(key: string): Promise<number>;
    sMembers(key: string): Promise<string[]>;
    expire(key: string, time: number): Promise<number>;
    getKeys(pattern: string): Promise<string[]>;
    deleteMultipleKeys(keys: string[]): Promise<number>;
}
