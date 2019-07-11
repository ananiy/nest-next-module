import Next from 'next'

import { FactoryProvider } from '@nestjs/common/interfaces'
import { NextServer, NextServerOptions } from './types'

export const NextServerToken = 'NextServerToken'

export const createNextServer = (
  nextServerOptions: NextServerOptions
): FactoryProvider<Promise<NextServer>> => ({
  provide: NextServerToken,
  useFactory: async () => {
    const nextServer = Next(nextServerOptions)
    await nextServer.prepare()
    return nextServer
  },
})
