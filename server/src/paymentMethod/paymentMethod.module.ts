import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PaymentMethodService } from './paymentMethod.service';
import { PaymentMethodController } from './paymentMethod.controller';
import { PaymentMethod } from './entities/paymentMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
