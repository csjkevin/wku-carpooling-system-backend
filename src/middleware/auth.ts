import { Middleware } from '@midwayjs/decorator';
import { IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/web';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.session.user) {
        return { success: false, message: 'authentication required' };
      }
      return await next();
    };
  }
}
