import { Inject, Provide } from '@midwayjs/decorator';
import * as dayjs from 'dayjs';
import { OrderDTO } from '../dto/order';
import { HttpService } from '@midwayjs/axios';

const DATE_FORMAT = 'YYYY年M月D日 HH:mm';
const WECHATWORK_WEBHOOK_KEY =
  process.env.WKU_CARPOOLING_SYSTEM_WECHATWORK_WEBHOOK_KEY;
const FEISHU_WEBHOOK_ID = process.env.WKU_CARPOOLING_SYSTEM_FEISHU_WEBHOOK_ID;

@Provide()
export class NotificationService {
  @Inject()
  httpService: HttpService;

  async newOrderNotificationWechatWork(options: OrderDTO) {
    if (!WECHATWORK_WEBHOOK_KEY) {
      return;
    }
    const res = await this.httpService.post(
      `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${WECHATWORK_WEBHOOK_KEY}`,
      {
        msgtype: 'markdown',
        markdown: {
          content: `有人发起了新的拼车行程\n>出发地:<font color="comment">${
            options.fromAddress
          }</font>\n>目的地：<font color="comment">${
            options.toAddress
          }</font>\n>出发时间：<font color="comment">${dayjs(
            options.departureTime
          ).format(DATE_FORMAT)}</font>\n>可拼人数：<font color="comment">${
            options.capacity
          }</font>\n>备注：<font color="comment">${
            options.remark || '无'
          }</font>`,
        },
      }
    );
    return res.data;
  }

  async newOrderNotificationFeishu(options: OrderDTO) {
    if (!FEISHU_WEBHOOK_ID) {
      return;
    }
    const res = await this.httpService.post(
      `https://open.feishu.cn/open-apis/bot/v2/hook/${FEISHU_WEBHOOK_ID}`,
      {
        msg_type: 'interactive',
        card: {
          header: {
            title: {
              tag: 'plain_text',
              content: '新拼车行程',
            },
          },
          elements: [
            {
              tag: 'div',
              fields: [
                {
                  is_short: false,
                  text: {
                    tag: 'lark_md',
                    content: `**出发地**\n${options.fromAddress}`,
                  },
                },
                {
                  is_short: false,
                  text: {
                    tag: 'lark_md',
                    content: `**目的地**\n${options.toAddress}`,
                  },
                },
                {
                  is_short: false,
                  text: {
                    tag: 'lark_md',
                    content: `**出发时间**\n${dayjs(
                      options.departureTime
                    ).format(DATE_FORMAT)}`,
                  },
                },
                {
                  is_short: false,
                  text: {
                    tag: 'lark_md',
                    content: `**可拼人数**\n${options.capacity}`,
                  },
                },
                {
                  is_short: false,
                  text: {
                    tag: 'lark_md',
                    content: `**备注**\n${options.remark || '无'}`,
                  },
                },
              ],
            },
          ],
        },
      }
    );
    return res.data;
  }
}
