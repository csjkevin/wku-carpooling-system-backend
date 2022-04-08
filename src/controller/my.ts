import { Controller, Get, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { AuthMiddleware } from '../middleware/auth';

@Controller('/my', { middleware: [AuthMiddleware] })
export class MyController {
  @Inject()
  ctx: Context;

  @Get('/profile')
  async getProfile() {
    return { success: true, message: 'OK', data: this.ctx.session.user };
  }
}
