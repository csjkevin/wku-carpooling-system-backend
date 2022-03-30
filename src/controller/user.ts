import {
  Inject,
  Controller,
  Get,
  Post,
  Del,
  Patch,
  Param,
  Body,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { User } from '../entity/user';
import { IResponse } from '../interface/common';
import { IUserOptions } from '../interface/user';
import { UserService } from '../service/user';

@Controller('/users')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/')
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<IResponse<IUserOptions & User>> {
    const user = await this.userService.createUser({
      email,
      password,
    });
    return { success: true, message: 'OK', data: user };
  }

  @Del('/:id')
  async deleteUser(@Param('id') id: number): Promise<IResponse> {
    await this.userService.deleteUser({ id });
    return { success: true, message: 'OK' };
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<IResponse> {
    await this.userService.updateUser({
      id,
      email,
      password,
    });
    return { success: true, message: 'OK' };
  }

  @Get('/:id')
  async getUser(@Param('id') id: number): Promise<IResponse<User>> {
    const user = await this.userService.getUser({ id });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/')
  async getAllUsers(): Promise<IResponse<User[]>> {
    const users = await this.userService.getAllUsers();
    return { success: true, message: 'OK', data: users };
  }
}
