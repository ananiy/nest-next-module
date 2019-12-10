import { Controller, Get, Req, Res } from '@nestjs/common'
import { NextResponse, NextRequest } from './types'

@Controller()
export class NextController {
  @Get('*')
  allHandler(@Req() req: NextRequest, @Res() res: NextResponse) {
    return res.nextRequestHandler(req, res)
  }
}
