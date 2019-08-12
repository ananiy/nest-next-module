import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common'
import {
  ModuleMetadata,
  Provider,
  DynamicModule,
} from '@nestjs/common/interfaces'
import { createNextServer } from './next-server.provider'
import { NextMiddleware } from './next.middleware'
import { NextController } from './next.controller'
import { NextServerOptions } from './types'

type ModuleType = NonNullable<ModuleMetadata['imports']>[0]

@Module({})
export class NestNextModule implements NestModule {
  static forRoot(
    nextServerOptions: NextServerOptions,
    cacheOptions?: {
      module: ModuleType
      provider: Provider
    }
  ): DynamicModule {
    const nextServer = createNextServer(nextServerOptions)
    const IMPORTS: ModuleType[] = []
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
