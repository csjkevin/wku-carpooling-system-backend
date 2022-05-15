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
import { OrderService } from '../service/order';

@Controller('/orders')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  orderService: OrderService;

  @Post('/')
  @Validate()
  async createOrder(@Body() order: CreateOrderDTO): Promise<IResponse<Order>> {
    const res = await this.orderService.createOrder({
      ...order,
      departureTime: new Date(order.departureTime),
    });
    return { success: true, message: 'OK', data: res };
  }

  @Del('/:id')
  async deleteOrder(@Param('id') id: number): Promise<IResponse> {
    await this.orderService.deleteOrder({ id });
    return { success: true, message: 'OK' };
  }

  @Patch('/:id')
  @Validate()
  async updateOrder(
    @Param('id') id: number,
    @Body() order: OrderDTO
  ): Promise<IResponse> {
    await this.orderService.updateOrder({
      id,
      ...order,
      departureTime: new Date(order.departureTime),
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
