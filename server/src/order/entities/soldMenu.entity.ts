import { Menu } from 'src/menu/entities/menu.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from './order.entity';
import { SoldMenuHasChoice } from './soldMenuHasChoice.entity';

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

  @OneToMany(
    () => SoldMenuHasChoice,
    (soldMenuHasChoice) => soldMenuHasChoice.soldMenuToChoice,
  )
  choices: SoldMenuHasChoice[];
}
