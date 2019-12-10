import { Request, Response } from 'express'
import Next, { NextApiRequest, NextApiResponse } from 'next'

export type NextServer = ReturnType<typeof Next>
export type NextServerOptions = Parameters<typeof Next>[0]

export interface NextRequest
  extends Request,
    Omit<NextApiRequest, keyof Request> {}

export interface NextResponse
  extends Response,
    Omit<NextApiResponse, keyof Response> {
  nextServer: NextServer
  nextRender: NextServer['render']
  nextRequestHandler: ReturnType<NextServer['getRequestHandler']>
}
