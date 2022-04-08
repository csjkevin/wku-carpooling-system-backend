import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { LoginDTO, RegisterDTO, VerifyDTO } from '../dto/auth';
import { UserService } from '../service/user';
import * as bcrypt from 'bcrypt';
import { RedisService } from '@midwayjs/redis';
import { v4 as uuidv4 } from 'uuid';
import { Validate, ValidateService } from '@midwayjs/validate';
import * as path from 'path';
import { EmailService } from '../service/email';
import { PLATFORM_NAME } from '../constant';
import * as ejs from 'ejs';

const SERVICE_NAME = 'wku.carpooling';
const SALT_ROUNDS = 10;
const EMAIL_TEMPLATE_PATH = path.resolve(
  __dirname,
  '../../assets/emailTemplates/userRegistration.ejs'
);
const WEBROOT = process.env.WKU_CARPOOLING_SYSTEM_WEBROOT;

@Controller('/')
export class AuthController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  emailService: EmailService;

  @Inject()
  validateService: ValidateService;

  @Inject()
  redisService: RedisService;

  @Post('/register')
  @Validate()
  async register(@Body() body: RegisterDTO) {
    const { email, password } = body;
    const res = await this.userService.get({ email });
    if (res) {
      return { success: false, message: 'user exists' };
    }
    body.password = await bcrypt.hash(password, SALT_ROUNDS);
    const token = uuidv4();
    body.token = token;

    await this.redisService.set(
      `${SERVICE_NAME}:unverified.user:${email}:string`,
      JSON.stringify(body),
      'EX',
      86400
    );

    const verificationLink = `${WEBROOT}/verify?email=${email}&token=${token}`;
    const emailContent = await ejs.renderFile(EMAIL_TEMPLATE_PATH, {
      platformName: PLATFORM_NAME,
      verificationLink,
    });
    await this.emailService.send(email, '请验证您的邮箱', emailContent);

    return { success: true, message: 'OK' };
  }

  @Get('/verify')
  async verify(@Query('email') email: string, @Query('token') token: string) {
    const existUser = await this.userService.get({ email });
    if (existUser) {
      return { success: false, message: 'user exists' };
    }

    this.validateService.validate(VerifyDTO, {
      email,
      token,
    });

    const redisRes = await this.redisService.get(
      `${SERVICE_NAME}:unverified.user:${email}:string`
    );
    if (!redisRes) {
      return;
    }

    const user = JSON.parse(redisRes) as RegisterDTO;
    if (user && user.token === token) {
      const createRes = await this.userService.create({ ...user });
      if (createRes) {
        await this.redisService.del(
          `${SERVICE_NAME}:unverified.user:${email}:string`
        );
        this.ctx.session.user = user;
        return { success: true, message: 'OK', data: createRes };
      }
    }

    return { success: false, message: 'verification failed' };
  }

  @Post('/login')
  @Validate()
  async login(@Body() body: LoginDTO) {
    const res = await this.userService.get({ email: body.email });
    if (
      res &&
      ((await bcrypt.compare(body.password, res.password)) ||
        res.password === body.password)
    ) {
      delete res.password;
      this.ctx.session.user = res;
      return { success: true, message: 'OK', data: res };
    }
    return { success: false, message: 'username or password error' };
  }
}
