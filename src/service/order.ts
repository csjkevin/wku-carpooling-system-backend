import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Order } from '../entity/order';
import { Repository } from 'typeorm';
import { NotificationService } from './notification';
import { OrderDTO } from '../dto/order';

@Provide()
export class OrderService {
  @Inject()
  notificationService: NotificationService;

  @InjectEntityModel(Order)
  orderRepository: Repository<Order>;

  async create(options: OrderDTO) {
    const res = await this.orderRepository.save(options);
    if (res) {
      await this.notificationService.newOrderNotificationWechatWork(options);
      await this.notificationService.newOrderNotificationFeishu(options);
    }
    return res;
  }

  async delete(options: OrderDTO) {
    const res = await this.orderRepository.findOneBy({
      id: options.id,
    });
    if (res) {
      await this.orderRepository.remove(res);
    }
  }

  async update(options: OrderDTO) {
    const res = await this.orderRepository.findOneBy({
      id: options.id,
    });
    if (res) {
      for (const key in options) {
        res[key] = options[key];
      }
      await this.orderRepository.save(res);
    }
  }

  async get(options: OrderDTO) {
    const res = await this.orderRepository.findOneBy(options);
    return res;
  }

  async getAll() {
    const res = await this.orderRepository.find();
    return res;
  }
}
