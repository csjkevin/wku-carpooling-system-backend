import { Provide } from '@midwayjs/decorator';
import * as nodemailer from 'nodemailer';
import { PLATFORM_NAME } from '../constant';

const EMAIL_USER = process.env.WKU_CARPOOLING_SYSTEM_EMAIL_USER;
const EMAIL_PASS = process.env.WKU_CARPOOLING_SYSTEM_EMAIL_PASS;

@Provide()
export class EmailService {
  async send(receipants: string | string[], subject, html) {
    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    return await transporter.sendMail({
      from: `"WKU Carpooling" <${EMAIL_USER}>`,
      to: receipants,
      subject: `[${PLATFORM_NAME}] ${subject}`,
      html,
    });
  }
}
