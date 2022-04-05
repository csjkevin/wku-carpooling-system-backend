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
  async create(@Body() body: CreateUserDTO): Promise<IResponse<User>> {
    const res = await this.userService.create({
      ...body,
    });
    return { success: true, message: 'OK', data: res };
  }

  @Del('/:id')
  async delete(@Param('id') id: number): Promise<IResponse> {
    await this.userService.delete({ id });
    return { success: true, message: 'OK' };
  }

  @Patch('/:id')
  @Validate()
  async update(
    @Param('id') id: number,
    @Body() body: UserDTO
  ): Promise<IResponse> {
    await this.userService.update({
      id,
      ...body,
    });
    return { success: true, message: 'OK' };
  }

  @Get('/:id')
  async get(@Param('id') id: number): Promise<IResponse<User>> {
    const res = await this.userService.get({ id });
    return { success: true, message: 'OK', data: res };
  }

  @Get('/')
  async getAll(): Promise<IResponse<User[]>> {
    const res = await this.userService.getAll();
    return { success: true, message: 'OK', data: res };
  }
}
