import { PaymentMethod } from 'src/paymentMethod/entities/paymentMethod.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { SoldMenu } from './soldMenu.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.orders)
  paymentMethod: PaymentMethod;

  @OneToMany(() => SoldMenu, (soldMenu) => soldMenu.order)
  soldMenus: SoldMenu[];
}
