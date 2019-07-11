import NextServer from 'next-server/dist/server/next-server'
import { Request, Response } from 'express'
import { ParsedUrlQuery } from 'querystring'
import { UrlWithParsedQuery } from 'url'

export interface NextRequest extends Request {}

export interface NextResponse extends Response {
  nextServer: NextServer
  nextRender: (
    pathname: string,
    query?: ParsedUrlQuery,
    parsedUrl?: UrlWithParsedQuery
  ) => Promise<void>
  nextRequestHandler: ReturnType<NextServer['getRequestHandler']>
}
