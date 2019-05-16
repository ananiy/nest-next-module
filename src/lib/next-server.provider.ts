import Next from 'next'
import { Server as NextServerType, ServerOptions as NextServerOptions } from 'next'
import { FactoryProvider } from '@nestjs/common/interfaces'

export const NextServerToken = 'NextServerToken'

export const createNextServer = (nextServerOptions: NextServerOptions): FactoryProvider<Promise<NextServerType>> => ({
  provide: NextServerToken,
  useFactory: async () => {
    const nextServer = Next(nextServerOptions)
    await nextServer.prepare()
    return nextServer
  },
})
