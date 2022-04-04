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
import { Order } from '../entity/order';
import { IResponse } from '../interface/common';
import { IUserOptions } from '../interface/user';
import { OrderService } from '../service/order';

@Controller('/orders')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  orderService: OrderService;

  @Post('/')
  async createOrder(
    @Body('fromAddress') fromAddress: string,
    @Body('toAddress') toAddress: string,
    @Body('capacity') capacity: number,
    @Body('departureTime') departureTime: string,
    @Body('remark') remark: string
  ): Promise<IResponse<IUserOptions & Order>> {
    const order = await this.orderService.createOrder({
      fromAddress,
      toAddress,
      departureTime: new Date(departureTime),
      capacity,
      remark,
    });
    return { success: true, message: 'OK', data: order };
  }

  @Del('/:id')
  async deleteOrder(@Param('id') id: number): Promise<IResponse> {
    await this.orderService.deleteOrder({ id });
    return { success: true, message: 'OK' };
  }

  @Patch('/:id')
  async updateOrder(
    @Param('id') id: number,
    @Body('fromAddress') fromAddress: string,
    @Body('toAddress') toAddress: string,
    @Body('capacity') capacity: number,
    @Body('departureTime') departureTime: string,
    @Body('remark') remark: string
  ): Promise<IResponse> {
    await this.orderService.updateOrder({
      id,
      fromAddress,
      toAddress,
      departureTime: new Date(departureTime),
      capacity,
      remark,
    });
    return { success: true, message: 'OK' };
  }

  @Get('/:id')
  async getOrder(@Param('id') id: number): Promise<IResponse<Order>> {
    const order = await this.orderService.getOrder({ id });
    return { success: true, message: 'OK', data: order };
  }

  @Get('/')
  async getAllOrders(): Promise<IResponse<Order[]>> {
    const orders = await this.orderService.getAllOrders();
    return { success: true, message: 'OK', data: orders };
  }
}
