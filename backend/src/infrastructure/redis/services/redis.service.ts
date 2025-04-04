import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  public addOneToSet(hash: string, value: string): Promise<number> {
    return this.redisClient.sadd(hash, value);
  }

  public remOneFromSet(key: string, setMember: string): Promise<number> {
    return this.redisClient.srem(key, setMember);
  }

  public deleteByKey(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  public sMembers(key: string): Promise<string[]> {
    return this.redisClient.smembers(key);
  }

  public expire(key: string, time: number): Promise<number> {
    return this.redisClient.expire(key, time);
  }
}
