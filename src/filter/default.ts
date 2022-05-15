import { Catch } from '@midwayjs/decorator';

@Catch()
export class DefaultErrorFilter {
  async catch(err: any) {
    return {
      success: false,
      status: err.status ?? 500,
      message: err.message,
    };
  }
}
