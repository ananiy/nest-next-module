import { Request, Response } from 'express'
import { ParsedUrlQuery } from 'querystring'
import { UrlWithParsedQuery } from 'url'
import next from 'next/dist/server/next'

export type NextServer = ReturnType<typeof next>
export type NextServerOptions = Parameters<typeof next>[0]

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
