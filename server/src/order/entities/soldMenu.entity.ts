import { Menu } from 'src/menu/entities/menu.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class SoldMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  sales: number;

  @ManyToOne(() => Order, (order) => order.soldMenus)
  order: Order;

  @ManyToOne(() => Menu, (menu) => menu.soldMenus)
  menu: Menu;
}
