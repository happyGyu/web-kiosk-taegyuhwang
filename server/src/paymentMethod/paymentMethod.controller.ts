import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { PaymentMethodService } from './paymentMethod.service';
import { Response } from 'express';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const paymentMethods = await this.paymentMethodService.findAll();
    return res.status(HttpStatus.OK).json(paymentMethods);
  }
}
