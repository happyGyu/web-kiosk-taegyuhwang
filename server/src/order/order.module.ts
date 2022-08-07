import { ChoiceModule } from './../choice/choice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { SoldMenu } from './entities/soldMenu.entity';
import { PaymentMethodModule } from 'src/paymentMethod/paymentMethod.module';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, SoldMenu]),
    PaymentMethodModule,
    MenuModule,
    ChoiceModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
