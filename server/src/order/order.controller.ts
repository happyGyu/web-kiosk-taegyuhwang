import { Response } from 'express';
import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';

import { CreateOrderDto } from './dto/createOrderDto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Res() res: Response, @Body() createOrderDto: CreateOrderDto) {
    const { paymentMethodId } = createOrderDto;
    const isValidPayment = await this.orderService.checkPaymentValidity(
      paymentMethodId,
    );
    if (!isValidPayment)
      return res.status(HttpStatus.I_AM_A_TEAPOT).json({ status: 'failed' });
    await this.orderService.create(createOrderDto);
    return res.status(HttpStatus.CREATED).json({ status: 'ok' });
  }
}
