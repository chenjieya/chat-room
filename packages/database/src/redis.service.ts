import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { REDIS_CLIENT } from './tokens'

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly client: any) {}

  get raw() {
    return this.client
  }

  async get(key: string) {
    return this.client.get(key)
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds && ttlSeconds > 0) {
      return this.client.set(key, value, { EX: ttlSeconds })
    }
    return this.client.set(key, value)
  }

  async del(key: string) {
    return this.client.del(key)
  }

  async onModuleDestroy() {
    if (this.client?.quit) {
      await this.client.quit()
    }
  }
}
