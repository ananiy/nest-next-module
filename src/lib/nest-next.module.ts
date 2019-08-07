import {
  NestModule,
  MiddlewareConsumer,
  Module,
  CacheModule,
  CacheManagerOptions,
  CacheInterceptor,
} from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import {
  DynamicModule,
  Provider,
  ModuleMetadata,
} from '@nestjs/common/interfaces'
import { createNextServer } from './next-server.provider'
import { NextMiddleware } from './next.middleware'
import { NextController } from './next.controller'
import { NextServerOptions } from './types'

@Module({})
export class NestNextModule implements NestModule {
  static forRoot(
    nextServerOptions: NextServerOptions,
    cacheOptions?: CacheManagerOptions
  ): DynamicModule {
    const nextServer = createNextServer(nextServerOptions)
    const IMPORTS: ModuleMetadata['imports'] = []
    const PROVIDES: Provider[] = [nextServer]
    if (typeof cacheOptions !== 'undefined') {
      IMPORTS.push(CacheModule.register(cacheOptions))
      PROVIDES.push({
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor,
      })
    }

    return {
      module: NestNextModule,
      imports: IMPORTS,
      controllers: [NextController],
      providers: PROVIDES,
      exports: [nextServer],
    }
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NextMiddleware).forRoutes('*')
  }
}
