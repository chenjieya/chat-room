import { DynamicModule, Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { createClient } from 'redis'
import { ALVIS_DATABASE_OPTIONS, REDIS_CLIENT } from './tokens'
import type { AlvisDatabaseModuleOptions } from './types'
import { RedisService } from './redis.service'
import { deepMerge } from '@alvis/utils'

@Global()
@Module({})
export class AlvisDatabaseModule {
  static forRoot(options: AlvisDatabaseModuleOptions): DynamicModule {
    const providers: any[] = [
      {
        provide: ALVIS_DATABASE_OPTIONS,
        useValue: options
      }
    ]

    const importsList: any[] = []
    const exportsList: any[] = []

    let typeormOptions = {
      type: 'mysql',
      timezone: 'local',
      logging: true, // 开启所有日志
      logger: 'simple-console',
      extra: {
        connectionLimit: 10, // 最大连接数
        connectTimeout: 10000, // 连接超时时间（毫秒）
        // acquireTimeout: 10000, // 获取连接超时时间
        waitForConnections: true, // 等待连接
        queueLimit: 0,
        enableKeepAlive: true, // 启用 keep-alive
        keepAliveInitialDelay: 0 // keep-alive 初始延迟
      },
      // 其他优化配置
      poolSize: 10, // 连接池大小
      connectorPackage: 'mysql2', // 使用 mysql2 驱动（已使用）
      retryAttempts: 3, // 重试次数
      retryDelay: 3000 // 重试延迟（毫秒）
    }

    if (options.typeorm) {
      typeormOptions = deepMerge(typeormOptions, options.typeorm)
      importsList.push(TypeOrmModule.forRoot(typeormOptions as any))
      exportsList.push(TypeOrmModule)
    }

    if (options.redis) {
      providers.push({
        provide: REDIS_CLIENT,
        useFactory: async () => {
          const client =
            typeof options.redis === 'string'
              ? createClient({ url: options.redis })
              : createClient(options.redis as any)

          await client.connect()
          return client
        }
      })
      providers.push(RedisService)
      exportsList.push(REDIS_CLIENT, RedisService)
    }

    return {
      module: AlvisDatabaseModule,
      imports: importsList,
      providers,
      exports: exportsList
    }
  }
}
