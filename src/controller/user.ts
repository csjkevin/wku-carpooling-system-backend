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
import { Validate, ValidateService } from '@midwayjs/validate';
import { Context } from 'egg';
import { CreateUserDTO, UserDTO } from '../dto/user';
import { User } from '../entity/user';
import { IResponse } from '../interface/common';
import { UserService } from '../service/user';

@Controller('/users')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  validateService: ValidateService;

  @Post('/')
  @Validate()
  async createUser(@Body() user: CreateUserDTO): Promise<IResponse<User>> {
    const res = await this.userService.createUser({
      ...user,
    });
    return { success: true, message: 'OK', data: res };
  }

  @Del('/:id')
  async deleteUser(@Param('id') id: number): Promise<IResponse> {
    await this.userService.deleteUser({ id });
    return { success: true, message: 'OK' };
  }

  @Patch('/:id')
  @Validate()
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserDTO
  ): Promise<IResponse> {
    await this.userService.updateUser({
      id,
      ...user,
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
