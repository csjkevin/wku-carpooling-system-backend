import { Controller, Get, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';

@Controller('/my')
export class MyController {
  @Inject()
  ctx: Context;

  @Get('/profile')
  async getProfile() {
    return { success: true, message: 'OK', data: this.ctx.session.user };
  }
}
