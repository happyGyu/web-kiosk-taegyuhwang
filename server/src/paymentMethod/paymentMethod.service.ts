import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './entities/paymentMethod.entity';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async findAll() {
    return await this.paymentMethodRepository.find();
  }

  async findById(id: number) {
    return await this.paymentMethodRepository.findOneBy({ id });
  }
}
