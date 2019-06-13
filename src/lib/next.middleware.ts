import { Injectable, NestMiddleware, Inject } from '@nestjs/common'
import { NextServerToken } from './next-server.provider'
import { NextRequest, NextResponse } from './types'
import { Server as NextServer } from 'next'

@Injectable()
export class NextMiddleware
  implements NestMiddleware<NextRequest, NextResponse> {
  constructor(@Inject(NextServerToken) private nextServer: NextServer) {}

  use(req: NextRequest, res: NextResponse, next: () => void) {
    res.nextServer = this.nextServer
    res.nextRender = this.nextServer.render.bind(this.nextServer, req, res)
    res.nextRequestHandler = this.nextServer
      .getRequestHandler()
      .bind(this.nextServer)
    next()
  }
}
