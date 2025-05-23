import { RedisClientType } from "redis";
import { ICacheService } from "../interfaces/i-cache-service";
import { inject, injectable } from "inversify";
import TYPES from "@/inversify/types";

@injectable()
export class CacheService implements ICacheService {
  constructor(
    @inject(TYPES.RedisClient) private readonly redisClient: RedisClientType
  ) {}

  async set(key: string, value: string, ttl?: number): Promise<void> {
     await this.redisClient.set(key, value, { EX: ttl });
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
