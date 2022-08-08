import { PickType } from '@nestjs/mapped-types';

import { SoldMenu } from 'src/order/entities/soldMenu.entity';

export class CreateOrderDto {
  paymentMethodId: number;
  soldMenus: CreateOrderSoldMenuDto[];
}

export class CreateOrderSoldMenuDto extends PickType(SoldMenu, [
  'quantity',
] as const) {
  menuId: number;
  choiceIds: number[];
}
