import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Order } from 'src/order/entities/order.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.paymentMethod)
  orders: Order[];
}
