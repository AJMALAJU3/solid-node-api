import { injectable } from "inversify";
import crypto from "crypto";
import { IOtpService } from "../interfaces/i-otp-service";
import { ICacheService } from "../interfaces/i-cache-service";
import { inject } from "inversify";
import TYPES from "@/inversify/types";

@injectable()
export class OtpService implements IOtpService {
  constructor(
    @inject(TYPES.CacheService)
    private readonly cacheService: ICacheService
  ) {}

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateOtpToken(email: string, otp: string): string {
    return crypto
      .createHash("sha256")
      .update(email + otp)
      .digest("hex");
  }

  async storeOtp(email: string, otp: string, ttl = 300): Promise<void> {
    const redisKey = this.getOtpRedisKey(email);
    await this.cacheService.set(redisKey, otp, ttl);
  }

  async verifyOtp(email: string, inputOtp: string): Promise<boolean> {
    const redisKey = this.getOtpRedisKey(email);
    const storedOtp = await this.cacheService.get(redisKey);
    return storedOtp === inputOtp;
  }

  async deleteOtp(email: string): Promise<void> {
  const redisKey = this.getOtpRedisKey(email);
  await this.cacheService.del(redisKey);
}


  private getOtpRedisKey(email: string): string {
    return `otp:${email}`;
  }
}
