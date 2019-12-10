import Next, { NextApiRequest, NextApiResponse } from 'next'

export type NextServer = ReturnType<typeof Next>
export type NextServerOptions = Parameters<typeof Next>[0]

export interface NextRequest extends NextApiRequest {}

export interface NextResponse extends NextApiResponse {
  nextServer: NextServer
  nextRender: NextServer['render']
  nextRequestHandler: ReturnType<NextServer['getRequestHandler']>
}
