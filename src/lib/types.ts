import { Server as NextServer } from 'next'
import { Request, Response } from 'express'
import { DefaultQuery, UrlLike } from 'next/router'

export interface NextRequest extends Request {}

export interface NextResponse extends Response {
  nextServer: NextServer
  nextRender: (
    pathname: string,
    query?: DefaultQuery,
    parsedUrl?: UrlLike
  ) => Promise<void>
  nextRequestHandler: ReturnType<NextServer['getRequestHandler']>
}
