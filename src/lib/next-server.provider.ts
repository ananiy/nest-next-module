import Next from 'next'
import NextServerType, {
  ServerConstructor as NextServerOptions,
} from 'next-server/dist/server/next-server'
import { FactoryProvider } from '@nestjs/common/interfaces'

export const NextServerToken = 'NextServerToken'

export const createNextServer = (
  nextServerOptions: NextServerOptions
): FactoryProvider<Promise<NextServerType>> => ({
  provide: NextServerToken,
  useFactory: async () => {
    const nextServer = Next(nextServerOptions)
    await nextServer.prepare()
    return nextServer
  },
})
