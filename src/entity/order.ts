import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fromAddress: string;

  @Column()
  toAddress: string;

  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  remark: string;
}
