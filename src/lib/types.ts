import { Request, Response } from 'express'
import Next, { NextApiRequest, NextApiResponse } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { UrlWithParsedQuery } from 'url'

export type NextServer = ReturnType<typeof Next>
export type NextServerOptions = Parameters<typeof Next>[0]

export interface NextRequest
  extends Request,
    Omit<NextApiRequest, keyof Request> {}

export interface NextResponse
  extends Response,
    Omit<NextApiResponse, keyof Response> {
  nextServer: NextServer
  nextRender: (
    pathname: string,
    query?: ParsedUrlQuery,
    parsedUrl?: UrlWithParsedQuery
  ) => Promise<void>
  nextRequestHandler: ReturnType<NextServer['getRequestHandler']>
}
