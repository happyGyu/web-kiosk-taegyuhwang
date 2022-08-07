import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';
import { MenuModule } from './menu/menu.module';
import { ChoiceModule } from './choice/choice.module';
import { OrderModule } from './order/order.module';
import { PaymentMethodModule } from './paymentMethod/paymentMethod.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    MenuModule,
    ChoiceModule,
    OrderModule,
    PaymentMethodModule,
  ],
})
export class AppModule {}
