import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { DynamicModule } from '@nestjs/common/interfaces'
import { createNextServer } from './next-server.provider'
import { NextMiddleware } from './next.middleware'
import { NextController } from './next.controller'
import { NextServerOptions } from './types'

@Module({})
export class NestNextModule implements NestModule {
  static forRoot(nextServerOptions: NextServerOptions): DynamicModule {
    const nextServer = createNextServer(nextServerOptions)

    return {
      module: NestNextModule,
      controllers: [NextController],
      providers: [nextServer],
      exports: [nextServer],
    }
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NextMiddleware).forRoutes('*')
  }
}
