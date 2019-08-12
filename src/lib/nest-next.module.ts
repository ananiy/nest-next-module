import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { DynamicModule, Provider } from '@nestjs/common/interfaces'
import { createNextServer } from './next-server.provider'
import { NextMiddleware } from './next.middleware'
import { NextController } from './next.controller'
import { NextServerOptions } from './types'

@Module({})
export class NestNextModule implements NestModule {
  static forRoot(
    nextServerOptions: NextServerOptions,
    cacheOptions?: {
      module: DynamicModule
      provider: Provider
    }
  ): DynamicModule {
    const nextServer = createNextServer(nextServerOptions)
    const IMPORTS: DynamicModule[] = []
    const PROVIDERS: Provider[] = [nextServer]
    if (typeof cacheOptions !== 'undefined') {
      IMPORTS.push(cacheOptions.module)
      PROVIDERS.push(cacheOptions.provider)
    }

    return {
      module: NestNextModule,
      imports: IMPORTS,
      controllers: [NextController],
      providers: PROVIDERS,
      exports: [nextServer],
    }
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NextMiddleware).forRoutes('*')
  }
}
