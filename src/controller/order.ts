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
import { Validate } from '@midwayjs/validate';
import { Context } from 'egg';
import { CreateOrderDTO, OrderDTO } from '../dto/order';
import { Order } from '../entity/order';
import { IResponse } from '../interface/common';
import { AuthMiddleware } from '../middleware/auth';
import { OrderService } from '../service/order';

@Controller('/orders', { middleware: [AuthMiddleware] })
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  orderService: OrderService;

  @Post('/')
  @Validate()
  async create(@Body() body: CreateOrderDTO): Promise<IResponse<Order>> {
    const res = await this.orderService.create({
      ...body,
      departureTime: new Date(body.departureTime),
    });
    return { success: true, message: 'OK', data: res };
  }

  @Del('/:id')
  async delete(@Param('id') id: number): Promise<IResponse> {
    await this.orderService.delete({ id });
    return { success: true, message: 'OK' };
  }

  @Patch('/:id')
  @Validate()
  async update(
    @Param('id') id: number,
    @Body() body: OrderDTO
  ): Promise<IResponse> {
    await this.orderService.update({
      id,
      ...body,
      departureTime: new Date(body.departureTime),
    });
    return { success: true, message: 'OK' };
  }

  @Get('/:id')
  async get(@Param('id') id: number): Promise<IResponse<Order>> {
    const res = await this.orderService.get({ id });
    return { success: true, message: 'OK', data: res };
  }

  @Get('/')
  async getAll(): Promise<IResponse<Order[]>> {
    const res = await this.orderService.getAll();
    return { success: true, message: 'OK', data: res };
  }
}
