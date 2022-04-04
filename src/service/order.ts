import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Order } from '../entity/order';
import { Repository } from 'typeorm';
import { IOrderOptions } from '../interface/order';
import { NotificationService } from './notification';

@Provide()
export class OrderService {
  @Inject()
  notificationService: NotificationService;

  @InjectEntityModel(Order)
  orderRepository: Repository<Order>;

  async createOrder(options: IOrderOptions) {
    const order = await this.orderRepository.save(options);
    if (order) {
      await this.notificationService.newOrderNotificationWechatWork(options);
      await this.notificationService.newOrderNotificationFeishu(options);
    }
    return order;
  }

  async deleteOrder(options: IOrderOptions) {
    const order = await this.orderRepository.findOneBy({
      id: options.id,
    });
    if (order) {
      await this.orderRepository.remove(order);
    }
  }

  async updateOrder(options: IOrderOptions) {
    const order = await this.orderRepository.findOneBy({
      id: options.id,
    });
    if (order) {
      for (const key in options) {
        order[key] = options[key];
      }
      await this.orderRepository.save(order);
    }
  }

  async getOrder(options: IOrderOptions) {
    const order = await this.orderRepository.findOneBy(options);
    return order;
  }

  async getAllOrders() {
    const orders = await this.orderRepository.find();
    return orders;
  }
}
