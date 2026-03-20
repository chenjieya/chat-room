export interface AlvisDatabaseModuleOptions {
  typeorm?: import('@nestjs/typeorm').TypeOrmModuleOptions
  redis?: import('redis').RedisClientOptions | string
}
