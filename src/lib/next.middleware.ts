import { Injectable, NestMiddleware, Inject } from '@nestjs/common'
import { NextServerToken } from './next-server.provider'
import { NextServer, NextRequest, NextResponse } from './types'

@Injectable()
export class NextMiddleware
  implements NestMiddleware<NextRequest, NextResponse> {
  constructor(@Inject(NextServerToken) private nextServer: NextServer) {}

  use(_req: NextRequest, res: NextResponse, next: () => void): void {
    res.nextServer = this.nextServer
    res.nextRender = this.nextServer.render
    res.nextRequestHandler = this.nextServer.getRequestHandler()
    next()
  }
}
